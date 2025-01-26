FROM node:21.7.1-slim

# System dependencies with certificate fixes
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    curl \
    ca-certificates \
    unzip && \
    rm -rf /var/lib/apt/lists/* && \
    update-ca-certificates --fresh

# Create application user with proper permissions
RUN useradd -m -u 1001 appuser && \
    mkdir -p /app/kystapp && \
    chown -R appuser:appuser /app

# Install Bun globally with proper PATH
RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin && \
    chmod 755 /usr/local/bin/bun && \
    echo 'export PATH="$PATH:/usr/local/bin"' >> /etc/profile

# Clone repository
RUN git clone https://github.com/KysTT/kystapp.git /app/kystapp

# Set permissions and switch user
RUN chown -R appuser:appuser /app/kystapp
USER appuser
WORKDIR /app/kystapp

# Install root dependencies
ENV PATH="/usr/local/bin:$PATH"
RUN bun install

# Build frontend
WORKDIR /app/kystapp/frontend
RUN bun install
RUN bun run build

# Final setup
WORKDIR /app/kystapp
EXPOSE 3000
CMD ["bun", "run", "start"]