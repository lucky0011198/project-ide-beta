#!/bin/bash

# Function to recover a file
recover_file() {
    local file_name=$1
    local file_hash=$2
    local output_dir="src/components/ui"

    # Create the output directory if it doesn't exist
    mkdir -p "$output_dir"

    # Recover the file
    if git show "$file_hash" > "$output_dir/$file_name" 2>/dev/null; then
        echo "Recovered $file_name"
    else
        echo "Failed to recover $file_name"
    fi
}

# Recover each file with its specific hash
recover_file "breadcrumb.tsx" "cfdc9ac2e75bec2d7b85dabbeeeb3646aaeff67e"
recover_file "button.tsx" "65d4fcd9ca74240125c5f72cf84c873781141fea"
recover_file "collapsible.tsx" "a23e7a281287e18b1c332498491b6bcc8d8e2b70"
recover_file "dropdown-menu.tsx" "96094b2361a465ea6a2e20e4d5d77641f4662392"
recover_file "input.tsx" "5af26b2c1a97d79e49a2de86832d7c7ef2090c83"
recover_file "label.tsx" "683faa793819982d64e21cb2939666fd6d4a7b13"
recover_file "separator.tsx" "6d7f12265ba0338704f013930ce4d52c56527dd1"
recover_file "sheet.tsx" "639ffcbe1515bc50b4038630591f21bc480d5836"
recover_file "sidebar.tsx" "82000d03c131d31a82c4a6e97baef3d1fee1a163"
recover_file "skeleton.tsx" "d7e45f7bd315f86eabf32f2c9425223417920e60"
recover_file "tooltip.tsx" "218d1835f790e84a73bfdbe2feddb1dd14cb34ab"

echo "Recovery process completed."
