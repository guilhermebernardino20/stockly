from flask import Flask, request, jsonify
from database import get_connection
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# ──────────────────────────────────────────
# PRODUTOS
# ──────────────────────────────────────────

# Cadastrar produto (Sprint 2 - PBI 1)
@app.route('/api/produtos', methods=['POST'])
def cadastrar_produto():
    data = request.get_json()
    nome         = data.get('nome')
    id_categoria = data.get('id_categoria')
    id_micro     = data.get('id_micro')
    marca        = data.get('marca')
    tamanho      = data.get('tamanho')
    preco        = data.get('preco')
    quantidade   = data.get('quantidade', 0)

    if not all([nome, id_categoria, id_micro, preco]):
        return jsonify({'erro': 'Campos obrigatórios faltando.'}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO produto (id_micro, id_categoria, nome, marca, tamanho, preco, quantidade)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (id_micro, id_categoria, nome, marca, tamanho, preco, quantidade))
        conn.commit()
        return jsonify({'mensagem': 'Produto cadastrado com sucesso!', 'id': cursor.lastrowid}), 201
    except Exception as e:
        return jsonify({'erro': str(e)}), 500
    finally:
        cursor.close()
        conn.close()


# Listar produtos (Sprint 2 - PBI 4: visualização)
@app.route('/api/produtos', methods=['GET'])
def listar_produtos():
    id_micro = request.args.get('id_micro')

    if not id_micro:
        return jsonify({'erro': 'id_micro é obrigatório.'}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT p.id_produto, p.nome, p.marca, p.tamanho, p.preco, p.quantidade,
                   c.nome AS categoria
            FROM produto p
            JOIN categoria c ON p.id_categoria = c.id_categoria
            WHERE p.id_micro = %s
            ORDER BY p.data_cadastro DESC
        """, (id_micro,))
        produtos = cursor.fetchall()
        return jsonify(produtos), 200
    except Exception as e:
        return jsonify({'erro': str(e)}), 500
    finally:
        cursor.close()
        conn.close()


# Filtrar produtos (Sprint 2 - PBI 3: filtragem)
@app.route('/api/produtos/filtrar', methods=['GET'])
def filtrar_produtos():
    id_micro   = request.args.get('id_micro')
    nome       = request.args.get('nome', '')
    categoria  = request.args.get('categoria', '')

    if not id_micro:
        return jsonify({'erro': 'id_micro é obrigatório.'}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT p.id_produto, p.nome, p.marca, p.tamanho, p.preco, p.quantidade,
                   c.nome AS categoria
            FROM produto p
            JOIN categoria c ON p.id_categoria = c.id_categoria
            WHERE p.id_micro = %s
              AND p.nome LIKE %s
              AND c.nome LIKE %s
            ORDER BY p.nome ASC
        """, (id_micro, f'%{nome}%', f'%{categoria}%'))
        produtos = cursor.fetchall()
        return jsonify(produtos), 200
    except Exception as e:
        return jsonify({'erro': str(e)}), 500
    finally:
        cursor.close()
        conn.close()


# Excluir produto (Sprint 2 - PBI 2)
@app.route('/api/produtos/<int:id_produto>', methods=['DELETE'])
def excluir_produto(id_produto):
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM produto WHERE id_produto = %s", (id_produto,))
        conn.commit()
        if cursor.rowcount == 0:
            return jsonify({'erro': 'Produto não encontrado.'}), 404
        return jsonify({'mensagem': 'Produto excluído com sucesso!'}), 200
    except Exception as e:
        return jsonify({'erro': str(e)}), 500
    finally:
        cursor.close()
        conn.close()


# ──────────────────────────────────────────
# INICIAR SERVIDOR
# ──────────────────────────────────────────

if __name__ == '__main__':
    app.run(debug=True)