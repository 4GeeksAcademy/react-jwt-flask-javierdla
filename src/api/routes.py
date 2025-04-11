"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import bcrypt
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

api = Blueprint('api', __name__)

CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json();

    if not data.get('email') or not data.get('password'):
        return jsonify({"error": "Email and password required"}), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400
    
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    new_user = User(
        email = data['email'], 
        password = hashed_password,
        is_active = True
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfuly"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Verificación de que los datos necesarios estén
    if not data.get('email') or not data.get('password'):
        return jsonify({"error": "Email and password required"}), 400

    # Buscar al usuario en la base de datos por el correo electrónico
    user = User.query.filter_by(email=data['email']).first()

    # Si no se encuentra el usuario, devolver error
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 401
    
    # Crear un token de acceso si la contraseña es correcta
    token = create_access_token(identity=str(user.id))
    return jsonify({"msg": "Inicio de sesión exitoso", "token": token}), 200



@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify({
        "msg": "Acceso autorizado",
        "user": user.serialize()
    }), 200