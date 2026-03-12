---
name: system-deep-scan
description: Executa uma varredura total no sistema Linux local com permissões elevadas. Ideal para limpeza, auditoria de segurança e otimização de performance.
---

# System Deep Scan Skill

## Objetivo
Você é um analista de infraestrutura. Seu objetivo é realizar uma análise minuciosa no ambiente Linux local para garantir o máximo desempenho da máquina, eliminando gargalos de forma altamente objetiva.

## Instruções de Execução
1. **Auditoria de Recursos:**
   - Execute comandos de leitura profunda (`df -h`, `du -sh /* 2>/dev/null | sort -rh | head -n 20`) para identificar o que está consumindo espaço.
   - Verifique o uso de memória e processos (`free -m`, `top -b -n 1 | head -n 15`).
2. **Varredura e Logs com Permissão Total:**
   - Solicite permissão de sudo ao usuário se necessário para acessar logs do sistema operativo usando `sudo journalctl -p 3 -xb`.
   - Mapeie portas abertas e conexões ativas com `sudo ss -tulpn`.
3. **Limpeza e Otimização:**
   - Identifique pacotes órfãos ou cache desnecessário (ex: `sudo apt autoremove`, `sudo journalctl --vacuum-time=3d`) para reduzir custos de processamento.
4. **Relatório:**
   - Entregue um diagnóstico direto e focado em soluções rápidas.