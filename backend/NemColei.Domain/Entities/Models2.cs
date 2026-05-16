using System;
using System.Collections.Generic;

namespace NemColei.Domain.Entities
{
    public enum PerfilUsuario { Aluno, Administrador, GerenciadorConteudo }

    public enum TipoQuestao { MultiplaEscolha }

    public class Aluno
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Nome { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string SenhaHash { get; set; } = string.Empty;

        public PerfilUsuario Perfil { get; set; } = PerfilUsuario.Aluno;

        public int XP { get; set; } = 0;

        public int Nivel { get; set; } = 1;

        public int DiasSequencia { get; set; } = 0;

        public DateTime UltimoAcesso { get; set; } = DateTime.UtcNow;

        public ICollection<Desempenho> Desempenhos { get; set; } = new List<Desempenho>();

        public ICollection<Conquista> Conquistas { get; set; } = new List<Conquista>();

        public ICollection<Tentativa> Tentativas { get; set; } = new List<Tentativa>();
    }

    public class Disciplina
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Nome { get; set; } = string.Empty;

        public string Cor { get; set; } = "#FFFFFF";

        public string Icone { get; set; } = "BookOpen";

        public ICollection<Avaliacao> Avaliacoes { get; set; } = new List<Avaliacao>();

        public ICollection<Desempenho> Desempenhos { get; set; } = new List<Desempenho>();
    }

    public class Avaliacao
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Titulo { get; set; } = string.Empty;

        public string Descricao { get; set; } = string.Empty;

        public Guid DisciplinaId { get; set; }

        public Disciplina Disciplina { get; set; } = null!;

        public int DuracaoMinutos { get; set; }

        public ICollection<Questao> Questoes { get; set; } = new List<Questao>();

        public ICollection<Tentativa> Tentativas { get; set; } = new List<Tentativa>();
    }

    public class Questao
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid AvaliacaoId { get; set; }

        public Avaliacao Avaliacao { get; set; } = null!;

        public string Enunciado { get; set; } = string.Empty;

        public TipoQuestao Tipo { get; set; } = TipoQuestao.MultiplaEscolha;

        public ICollection<Alternativa> Alternativas { get; set; } = new List<Alternativa>();
    }

    public class Alternativa
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid QuestaoId { get; set; }

        public Questao Questao { get; set; } = null!;

        public string Texto { get; set; } = string.Empty;

        public bool IsCorreta { get; set; }
    }

    public class Tentativa
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid AlunoId { get; set; }

        public Aluno Aluno { get; set; } = null!;

        public Guid AvaliacaoId { get; set; }

        public Avaliacao Avaliacao { get; set; } = null!;

        public DateTime DataInicio { get; set; } = DateTime.UtcNow;

        public DateTime? DataFim { get; set; }

        public decimal NotaFinal { get; set; }

        public ICollection<Resposta> Respostas { get; set; } = new List<Resposta>();
    }

    public class Resposta
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid TentativaId { get; set; }

        public Tentativa Tentativa { get; set; } = null!;

        public Guid QuestaoId { get; set; }

        public Questao Questao { get; set; } = null!;

        public Guid AlternativaId { get; set; }

        public Alternativa Alternativa { get; set; } = null!;

        public bool EstaCorreta { get; set; }
    }

    public class Desempenho
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid AlunoId { get; set; }

        public Aluno Aluno { get; set; } = null!;

        public Guid DisciplinaId { get; set; }

        public Disciplina Disciplina { get; set; } = null!;

        public int QuestoesCertas { get; set; }

        public int QuestoesTotais { get; set; }

        public decimal Precisao => QuestoesTotais > 0 ? (decimal)QuestoesCertas / QuestoesTotais * 100 : 0;
    }

    public class Conquista
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid AlunoId { get; set; }

        public Aluno Aluno { get; set; } = null!;

        public string Titulo { get; set; } = string.Empty;

        public string Descricao { get; set; } = string.Empty;

        public string Icone { get; set; } = string.Empty;

        public DateTime DataDesbloqueio { get; set; } = DateTime.UtcNow;
    }
}