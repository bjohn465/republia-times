# syntax=docker/dockerfile:1

# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=24.9.0
FROM node:${NODE_VERSION}-trixie-slim as base
WORKDIR /usr/src/app
EXPOSE 8788

FROM base as dev
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
RUN --mount=type=bind,source=.npmrc,target=.npmrc \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    mkdir /ms-playwright && \
    npm ci --include=dev && \
    npm run test:browser:install && \
    rm -rf /var/lib/apt/lists/* && \
    chmod -R 777 /ms-playwright
USER node
COPY . .
CMD ["bash"]
