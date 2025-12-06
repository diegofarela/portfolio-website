# Diego Martinez Portfolio

This is a static portfolio website built with HTML, CSS, and served using Nginx in a Docker container.

## Project Structure

- `public/`: Contains the static website files (HTML, CSS, JS).
- `Dockerfile`: Configuration for the Nginx Docker image.
- `docker-compose.yml`: Configuration to run the service with Docker Compose.

## How to Run Locally

Prerequisites: [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

1.  Open a terminal in this directory.
2.  Run the following command to build and start the server:

    ```bash
    docker-compose up -d --build
    ```

3.  Open your browser and navigate to:
    [http://localhost:8080](http://localhost:8080)

## Editing the Content

-   To change the content, edit `public/index.html`.
-   To change the styles, edit `public/styles.css`.
-   Changes to static files in `public/` should reflect immediately if the container is running (due to volume mapping in `docker-compose.yml`), but a browser refresh is needed.
