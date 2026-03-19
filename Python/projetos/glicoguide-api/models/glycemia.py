from extensions import db
from datetime import datetime, timezone

class GlycemiaRecord(db.Model):
    __tablename__ = 'glycemia_records'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    valor_mgdl = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
