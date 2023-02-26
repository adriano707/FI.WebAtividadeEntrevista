using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace WebAtividadeEntrevista.Validations
{
    public class CpfValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string cpf = value != null ? value.ToString() : string.Empty;

            if (!IsValidCPF(cpf))
                return new ValidationResult("Cpf inválido");

            return ValidationResult.Success;
        }

        private bool IsValidCPF(string cpf)
        {
            cpf = cpf.Trim().Replace(".", "").Replace("-", "");
            if (cpf.Length != 11 || cpf.All(c => c == cpf[0]))
                return false;
            int[] weights1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] weights2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            string partialCpf = cpf.Substring(0, 9);
            int sum = partialCpf.Select((c, i) => int.Parse(c.ToString()) * weights1[i])
                .Sum();
            int mod = sum % 11;
            int digit1 = mod < 2 ? 0 : 11 - mod;
            partialCpf += digit1;
            sum = partialCpf.Select((c, i) => int.Parse(c.ToString()) * weights2[i])
                .Sum();
            mod = sum % 11;
            int digit2 = mod < 2 ? 0 : 11 - mod;
            return cpf.EndsWith(digit1.ToString() + digit2.ToString());
        }
    }
}