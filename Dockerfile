FROM nginx:alpine

# Copy static assets to nginx html directory
COPY public /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
