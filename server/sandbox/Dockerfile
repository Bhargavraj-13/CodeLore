FROM python:3.12-slim

# Install g++ for C++
RUN apt-get update && apt-get install -y g++ && rm -rf /var/lib/apt/lists/*

# Create isolated working directory
WORKDIR /sandbox

# Create non-root user for safety
RUN useradd -m runner
USER runner

CMD ["bash"]
