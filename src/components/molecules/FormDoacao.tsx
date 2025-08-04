import React, { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  Alert,
  Snackbar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormSubmitButton, BackButton } from '../atoms';

// Tipos para o formulário
interface FormData {
  nomeONG: string;
  responsavel: string;
  email: string;
  telefone: string;
  categoria: string;
  descricao: string;
  localizacao: string;
  website?: string;
}

// Estilos customizados responsivos
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: '2rem auto',
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    margin: '1rem',
    padding: theme.spacing(0.5),
  },
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
  },
}));

// Categorias de ONGs ambientais
const categoriasAmbientais = [
  'Conservação da Biodiversidade',
  'Reflorestamento',
  'Sustentabilidade Urbana',
  'Educação Ambiental',
  'Preservação de Oceanos',
  'Energia Renovável',
  'Gestão de Resíduos',
  'Proteção Animal',
  'Agricultura Sustentável',
  'Mudanças Climáticas',
];

export default function FormDoacao() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formMethods = useForm<FormData>({
    defaultValues: {
      nomeONG: '',
      responsavel: '',
      email: '',
      telefone: '',
      categoria: '',
      descricao: '',
      localizacao: '',
      website: '',
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulação de envio (você pode substituir por uma API real)
    console.log('Dados da ONG:', data);
    
    // Simula delay de envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    reset(); // Limpa o formulário após envio
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <StyledCard elevation={3}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          gutterBottom 
          align="center" 
          color="primary"
          sx={{ px: { xs: 1, sm: 0 } }}
        >
          🌱 Cadastre sua ONG Ambiental
        </Typography>
        
        <Typography 
          variant={isMobile ? "body2" : "body1"} 
          color="text.secondary" 
          align="center" 
          sx={{ 
            mb: { xs: 3, sm: 4 },
            px: { xs: 1, sm: 0 },
            lineHeight: 1.5
          }}
        >
          Junte-se à nossa rede de organizações comprometidas com o meio ambiente.
          Preencha o formulário abaixo para que possamos conhecer melhor sua ONG.
        </Typography>

        <FormProvider {...formMethods}>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {/* Nome da ONG */}
            <Grid item xs={12} md={6}>
              <Controller
                name="nomeONG"
                control={control}
                rules={{
                  required: 'Nome da ONG é obrigatório',
                  minLength: {
                    value: 3,
                    message: 'Nome deve ter pelo menos 3 caracteres'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome da ONG"
                    error={!!errors.nomeONG}
                    helperText={errors.nomeONG?.message}
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                  />
                )}
              />
            </Grid>

            {/* Nome do Responsável */}
            <Grid item xs={12} md={6}>
              <Controller
                name="responsavel"
                control={control}
                rules={{
                  required: 'Nome do responsável é obrigatório',
                  minLength: {
                    value: 2,
                    message: 'Nome deve ter pelo menos 2 caracteres'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome do Responsável"
                    error={!!errors.responsavel}
                    helperText={errors.responsavel?.message}
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                  />
                )}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {/* Telefone */}
            <Grid item xs={12} md={6}>
              <Controller
                name="telefone"
                control={control}
                rules={{
                  required: 'Telefone é obrigatório',
                  pattern: {
                    value: /^[\d\s\-\(\)\+]+$/,
                    message: 'Formato de telefone inválido'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Telefone"
                    error={!!errors.telefone}
                    helperText={errors.telefone?.message}
                    variant="outlined"
                    placeholder="(47) 99999-9999"
                  />
                )}
              />
            </Grid>

            {/* Categoria */}
            <Grid item xs={12} md={6}>
              <Controller
                name="categoria"
                control={control}
                rules={{ required: 'Categoria é obrigatória' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.categoria}>
                    <InputLabel>Categoria Ambiental</InputLabel>
                    <Select
                      {...field}
                      label="Categoria Ambiental"
                    >
                      {categoriasAmbientais.map((categoria) => (
                        <MenuItem key={categoria} value={categoria}>
                          {categoria}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.categoria && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                        {errors.categoria.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Localização */}
            <Grid item xs={12} md={6}>
              <Controller
                name="localizacao"
                control={control}
                rules={{
                  required: 'Localização é obrigatória',
                  minLength: {
                    value: 5,
                    message: 'Localização deve ter pelo menos 5 caracteres'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Localização (Cidade/Estado)"
                    error={!!errors.localizacao}
                    helperText={errors.localizacao?.message}
                    variant="outlined"
                    placeholder="Joinville/SC"
                  />
                )}
              />
            </Grid>

            {/* Website (opcional) */}
            <Grid item xs={12}>
              <Controller
                name="website"
                control={control}
                rules={{
                  pattern: {
                    value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                    message: 'URL inválida'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Website (opcional)"
                    error={!!errors.website}
                    helperText={errors.website?.message || 'Ex: https://minhaong.org.br'}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            {/* Descrição */}
            <Grid item xs={12}>
              <Controller
                name="descricao"
                control={control}
                rules={{
                  required: 'Descrição é obrigatória',
                  minLength: {
                    value: 50,
                    message: 'Descrição deve ter pelo menos 50 caracteres'
                  },
                  maxLength: {
                    value: 500,
                    message: 'Descrição deve ter no máximo 500 caracteres'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    label="Descrição da ONG e seus projetos"
                    error={!!errors.descricao}
                    helperText={
                      errors.descricao?.message ||
                      `${field.value?.length || 0}/500 caracteres`
                    }
                    variant="outlined"
                    placeholder="Conte-nos sobre sua ONG, missão, projetos em andamento e como vocês contribuem para a preservação do meio ambiente..."
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* Botões de ação */}
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BackButton
              variant="outlined"
              size="large" 
              iconType="home"
              customRoute="/"
              sx={{ minWidth: 150 }}
            >
              Voltar ao Início
            </BackButton>
            
            <FormSubmitButton
              variant="contained"
              size="large"
              iconType="contact"
              isLoading={isSubmitting}
              loadingText="🌱 Enviando cadastro..."
              sx={{ minWidth: 250 }}
            >
              Cadastrar ONG
            </FormSubmitButton>
          </Box>
        </StyledForm>
        </FormProvider>

        {/* Snackbar de sucesso */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            🎉 Formulário enviado com sucesso! Entraremos em contato em breve para validar sua ONG.
          </Alert>
        </Snackbar>
      </CardContent>
    </StyledCard>
  );
}
