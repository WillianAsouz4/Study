from dataclasses import dataclass

@dataclass
class Meal:
    id: int = None
    food: str = ""
    carbs: float = 0.0
    datetime: str = ""  # formato: "YYYY-MM-DD HH:MM:SS"