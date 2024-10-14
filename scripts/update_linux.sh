#!/bin/bash

# Define backup directory with timestamp
TIMESTAMP=$(date +%Y%m%d%H%M%S)
BACKUP_DIR="prismaBackups/backup_${TIMESTAMP}_prisma"

# Create the backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Backup the entire prisma folder
cp -r prisma $BACKUP_DIR/

# Pull the latest changes from GitHub
git pull origin main

# Install any new dependencies
npm install

# Run Prisma migrations
npx prisma migrate deploy

# Build the project
npm run build

# Notify that the update was successful
echo "Update successful! Backup created at $BACKUP_DIR"
