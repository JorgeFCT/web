# -------- Etapa de construcción --------
    FROM node:18-bullseye AS builder

    WORKDIR /front
    
    # Copiamos dependencias
    COPY package*.json ./
    
    RUN rm -rf node_modules package-lock.json
    
    # Instalamos todas las dependencias necesarias (incluyendo opcionales como las de Rollup)
    RUN npm install
    
    # Copiamos el resto del proyecto
    COPY . .
    
    # Compilamos TypeScript (si aplica)
    RUN npx tsc
    
    # Construimos la app (vite build => crea /dist)
    RUN npm run build
    
    # -------- Etapa final --------
    FROM node:18-slim
    
    WORKDIR /front
    
    # Copiamos solo lo necesario desde builder
    COPY --from=builder /front/dist ./dist
    COPY --from=builder /front/package*.json ./
    COPY --from=builder /front/node_modules ./node_modules
    COPY --from=builder /front/vite.config.ts ./
    
    EXPOSE 3000
    
    # Usamos Vite preview para servir la app
    CMD ["npx", "vite", "preview", "--port", "3000"]
    