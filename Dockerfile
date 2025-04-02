# Usa a imagem oficial do Node.js (versão 18 para compatibilidade)
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Expõe a porta que a aplicação usa (definida no .env)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]