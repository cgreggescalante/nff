import os

ignore = [
    'node_modules',
    'dist',
    'firebase-export-1715815453046Z31SRI',
    '.firebase',
    '.vscode',
    '.idea',
    'package-lock.json',
    'firebase-debug.log',
    'firestore-debug.log',
    'ui-debug.log',
    '.git'
]

def count_lines_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as file:
        return sum(1 for _ in file)

def count_lines_in_directory(directory, depth=0):
    total_lines = 0
    for entry in os.listdir(directory):
        if entry in ignore:
            continue

        if os.path.isfile(os.path.join(directory, entry)) and entry.endswith('.ts') or entry.endswith('.tsx'):
            print(f"{directory}\{entry}")
            total_lines += count_lines_in_file(os.path.join(directory, entry))
        elif os.path.isdir(os.path.join(directory, entry)):
            total_lines += count_lines_in_directory(os.path.join(directory, entry), depth + 1)
    return total_lines

if __name__ == "__main__":
    current_directory = os.getcwd()
    total_lines = count_lines_in_directory(current_directory)
    print(f"Total number of lines in all files: {total_lines}")