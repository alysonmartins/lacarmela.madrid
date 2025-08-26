#!/usr/bin/env bash

# This script is a refactored version of the original. It is designed to work efficiently on macOS
# and uses the native 'sips' command-line tool to resize images.

SCRIPT_PATH=$(dirname "$0")

# Function to resize images
resize_images() {
    local size="$1"
    local suffix="$2"

    echo "Resizing images to ${size}px with suffix '${suffix}'..."
    # Duplicate original images with the specified suffix
    python3 "$SCRIPT_PATH"/tools/duplicate.py "$suffix"

    # Resize all duplicated images
    find "$SCRIPT_PATH"/photos -type f \( -name "*.jpeg" -o -name "*.jpg" -o -name "*.png" \) -print0 | while IFS= read -r -d '' file; do
        if [[ "$file" == *"$suffix"* ]]; then
            sips -Z "$size" "$file" &>/dev/null
        fi
    done
}

# Check if 'sips' is available
if ! command -v sips &> /dev/null; then
    echo "Error: The 'sips' command is not found. This script requires macOS to run."
    exit 1
fi

# Resize images for 'min' (minified) and 'placeholder' versions
resize_images 640 min
resize_images 32 placeholder

# Run the setup script
echo "Running setup script..."
python3 "$SCRIPT_PATH"/tools/setup.py

echo "Image processing complete."