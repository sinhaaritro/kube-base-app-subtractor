# Use a specific, official Deno base image
FROM docker.io/denoland/deno:1.37.1

# Set the working directory inside the container
WORKDIR /app

# Copy all local files (main.ts, index.html) into the container
COPY . .

# Optimization: Cache the dependencies during the build process
RUN deno cache main.ts

# Expose the port the Deno app listens on
EXPOSE 8000

# The command to run the application, with necessary permissions
CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "main.ts"]