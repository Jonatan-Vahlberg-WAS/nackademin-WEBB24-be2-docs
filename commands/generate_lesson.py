#!/usr/bin/env python3

import os
import shutil
import argparse
import json
from pathlib import Path

def create_lesson(path: str, title: str, position: int):
    """
    Create a new lesson based on template files from commands/data.
    
    Args:
        path (str): Path where the lesson should be created
        title (str): Title of the lesson
        position (int): Position in the sidebar
    """
    # Get the base directory (where the script is located)
    base_dir = Path(__file__).parent
    template_dir = base_dir / "data"
    target_dir = Path(path)

    # Create the target directory if it doesn't exist
    target_dir.mkdir(parents=True, exist_ok=True)

    # Create assets directory
    assets_dir = target_dir / "assets"
    assets_dir.mkdir(exist_ok=True)

    # Copy all files from template directory
    for file in template_dir.glob("*.md"):
        if file.is_file():
            shutil.copy2(file, target_dir / file.name)

    # Create _category_.json with the new title and position
    category_data = {
        "label": title,
        "position": position,
        "link": {
          "type": "generated-index",
          "description": ""
        }
      }

    with open(target_dir / "_category_.json", "w", encoding="utf-8") as f:
        json.dump(category_data, f, indent=2)

    print(f"Successfully created lesson '{title}' at {path}")
    print("Files created:")
    for file in target_dir.glob("*"):
        print(f"- {file.name}")

def main():
    parser = argparse.ArgumentParser(description="Generate a new lesson based on template files")
    parser.add_argument("path", help="Path where the lesson should be created")
    parser.add_argument("--title", required=True, help="Title of the lesson")
    parser.add_argument("--position", type=int, required=True, help="Position in the sidebar")

    args = parser.parse_args()
    create_lesson(args.path, args.title, args.position)

if __name__ == "__main__":
    main() 