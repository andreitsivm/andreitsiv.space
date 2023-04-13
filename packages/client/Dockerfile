# Base on offical Node.js Alpine image
FROM node:alpine as base

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN yarn global add pm2

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package.json ./

# Install dependencies
RUN yarn install

# Copy all files
COPY ./ ./
FROM base AS builder
COPY --from=deps /usr/app/node_modules ./node_modules
RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
FROM nginx:alpine

ENV NODE_ENV production
ENV PORT 3000
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /usr/app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /usr/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["pm2-runtime", "node", "server.js"]