from extensions import db
from datetime import datetime, timezone

class Meal(db.Model):
    __tablename__ = 'meals'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total_carboidratos_g = db.Column(db.Float, nullable=False)
    bolus_total_u = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255))
    observation = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    items = db.relationship('MealItem', backref='meal', lazy=True)

class MealItem(db.Model):
    __tablename__ = 'meals_items'

    id = db.Column(db.Integer, primary_key=True)
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.id'), nullable=False)
    nome = db.Column(db.String(150), nullable=False)
    porcao_g = db.Column(db.Float, nullable=False)
    carboidratos_g = db.Column(db.Float, nullable=False)

