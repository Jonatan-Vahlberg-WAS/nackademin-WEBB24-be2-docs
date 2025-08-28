#!/usr/bin/env python3

import os
import argparse
import base64
import requests
from pathlib import Path
from urllib.parse import urlparse


def save_base64_image(data_url, output_dir, index, prefix=None):
    header, encoded = data_url.split(',', 1)
    file_ext = header.split(';')[0].split('/')[1]
    if prefix:
        file_path = output_dir / f"{prefix}{index}.{file_ext}"
    else:
        file_path = output_dir / f"image_{index}.{file_ext}"
    with open(file_path, 'wb') as f:
        f.write(base64.b64decode(encoded))
    print(f"Saved base64 image as {file_path}")


def save_url_image(url, output_dir, index, prefix=None):
    response = requests.get(url, stream=True)
    response.raise_for_status()
    parsed = urlparse(url)
    orig_filename = os.path.basename(parsed.path)
    file_ext = os.path.splitext(orig_filename)[1] if '.' in orig_filename else ''
    if prefix:
        file_path = output_dir / f"{prefix}{index}{file_ext}"
    else:
        filename = orig_filename if orig_filename else f"image_{index}"
        file_path = output_dir / filename
    with open(file_path, 'wb') as f:
        for chunk in response.iter_content(1024):
            f.write(chunk)
    print(f"Downloaded {url} as {file_path}")


def main():
    parser = argparse.ArgumentParser(description="Fetch images from URLs or base64 data and save to temp folder.")
    parser.add_argument('--file', help='File containing image URLs or base64 data, one per line')
    parser.add_argument('inputs', nargs='*', help='List of image URLs or base64 data (ignored if --file is used)')
    parser.add_argument('--output', default='temp', help='Output directory (default: temp)')
    parser.add_argument('--prefix', default=None, help='Prefix for saved files, e.g., lesson_2_')
    args = parser.parse_args()

    output_dir = Path(__file__).parent / args.output
    output_dir.mkdir(parents=True, exist_ok=True)

    if args.file:
        with open(args.file, 'r', encoding='utf-8') as f:
            lines = [line.rstrip('\n') for line in f]
        items = [line for line in lines if line.strip() and not line.strip().startswith('#')]
    else:
        items = args.inputs

    for idx, item in enumerate(items):
        if item.startswith('https://') or item.startswith('http://'):
            try:
                save_url_image(item, output_dir, idx, args.prefix)
            except Exception as e:
                print(f"Failed to download {item}: {e}")
        elif item.startswith('data:image'):
            try:
                save_base64_image(item, output_dir, idx, args.prefix)
            except Exception as e:
                print(f"Failed to save base64 image: {e}")
        else:
            print(f"Unrecognized input: {item}")

if __name__ == "__main__":
    main()

