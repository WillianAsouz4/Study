def calcular_bolus(total_carboidratos_g: float, glicemia_atual: float,
                   glicemia_alvo: float, ratio_carb: float, fator_correcao: float) -> dict:
    """
    Calcula a dose de insulina bolus com base nos carboidratos da refeição
    e na glicemia atual do paciente.

    Args:
        total_carboidratos_g: Total de carboidratos da refeição em gramas.
        glicemia_atual:       Glicemia atual do paciente em mg/dL.
        glicemia_alvo:        Glicemia alvo do paciente em mg/dL.
        ratio_carb:           Gramas de carboidrato cobertos por 1 unidade de insulina.
        fator_correcao:       Quantos mg/dL 1 unidade de insulina reduz a glicemia.

    Returns:
        Dicionário com os componentes do cálculo e o bolus total recomendado.
    """
    bolus_refeicao = total_carboidratos_g / ratio_carb
    bolus_correcao = (glicemia_atual - glicemia_alvo) / fator_correcao
    bolus_total = bolus_refeicao + bolus_correcao

    return {
        "bolus_refeicao_u": round(bolus_refeicao, 2),
        "bolus_correcao_u": round(bolus_correcao, 2),
        "bolus_total_u": round(max(bolus_total, 0), 2),  # nunca negativo
        "detalhes": {
            "total_carboidratos_g": total_carboidratos_g,
            "glicemia_atual_mgdl": glicemia_atual,
            "glicemia_alvo_mgdl": glicemia_alvo,
            "ratio_carb": ratio_carb,
            "fator_correcao": fator_correcao
        }
    }