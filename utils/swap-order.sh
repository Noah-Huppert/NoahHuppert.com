#!/usr/bin/env bash
#?
# Swap Order - Swaps 2 post files with each other
#
# Usage: swap-order.sh POSTS_PATH A_POST_NUM B_POST_NUM
#
# Arguments
#	- A_POST_NUM (Integer): Order value of post to swap
#	- B_POST_NUM (Integer): Order value of other post to swap
#?

# Helpers
# get_post_name retrieves a post's name from a file path
# Arguments:
#	- post_num (Integer): Post order number
#	- file_path (String): Path of post file to get name from
function get_post_name() { # ( post_num, file_path ) 
	# Arguments
	post_num="$1"
	if [ -z "$post_num" ]; then
		echo "Error - get_post_name: post_num argument must be provided" >&2
		return 1
	fi

	file_path="$2"
	if [ -z "$file_path" ]; then
		echo "Error - get_post_name: file_path argument must be provided" >&2
		return 1
	fi

	if ! ls "$file_path" | sed "s/$post_num-\(.*\).md/\1/g"; then
		echo "Error - get_post_name: Failed to get post name" >&2
		return 1
	fi
}

# switch_order_value switches a post file's order value and writes it to the 
# disk.
# Arguments:
#	- post_path (String): Path of post file to swap order value for
#	- new_order (Integer): New order value
function switch_order_value() { # ( post_path, new_order ) 
	# Arguments
	post_path="$1"
	if [ -z "$post_path" ]; then
		echo "Error - switch_order_values: post_path argument must be provided" >&2
		return 1
	fi

	new_order="$2"
	if [ -z "$new_order" ]; then
		echo "Error - switch_order_value: new_order argument must be provided" >&2
		return 1
	fi

	if ! (cat "$post_path" | sed "s/^order = [0-9]*$/order = $new_order/g") > $post_path; then
		echo "Error - switch_order_value: Failed to switch order value" >&2
		return 1
	fi
}
# Arguments
posts_path="$1"
if [ -z "$posts_path" ]; then
	echo "Error: POSTS_PATH argument must be provided" >&2
	exit 1
fi

a_post_num="$2"
if [ -z "$a_post_num" ]; then
	echo "Error: A_POST_NUM argument must be provided" >&2
	exit 1
fi

b_post_num="$3"
if [ -z "$b_post_num" ]; then
	echo "Error: B_POST_NUM argument must be provided" >&2
	exit 1
fi

# Move to posts directory
if ! cd "$posts_path"; then
	echo "Error: Failed to move to posts path \"$posts_path\"" >&2
	exit 1
fi

# Test files exist
a_post_glob="$a_post_num-*.md"
if [ ! -f $a_post_glob ]; then
	echo "Error: File $a_post_glob does not exist" >&2
	exit 1
fi

b_post_glob="$b_post_num-*.md"
if [ ! -f $b_post_glob ]; then
	echo "Error: File $b_post_glob does not exist" >&2
	exit 1
fi

# Get post names
a_post_name="$(get_post_name $a_post_num $a_post_glob)"
if [ "$?" != "0" ]; then
	echo "Error: Failed to get name of post a" >&2
	exit 1
fi

b_post_name="$(get_post_name $b_post_num $b_post_glob)"
if [ "$?" != "0" ]; then
	echo "Error: Failed to get name of post b" >&2
	exit 1
fi

a_post_file="$a_post_num-$a_post_name.md"
b_post_file="$b_post_num-$b_post_name.md"

# Move files
a_new_post_file="$b_post_num-$a_post_name.md"
b_new_post_file="$a_post_num-$b_post_name.md"

if ! mv "$a_post_file" "$a_new_post_file"; then
	echo "Error: Failed to move post a to new file: $a_post_file -> $a_new_post_file" >&2
	exit 1
fi

if ! mv "$b_post_file" "$b_new_post_file"; then
	echo "Error: Failed to move post b to new file: $b_post_file -> $b_new_post_file" >&2
	exit 1
fi

# Set new order values
if ! switch_order_value "$a_new_post_file" "$b_post_num"; then
	echo "Error: Failed to switch order value for new a file to $b_post_num" >&2
	exit 1
fi

if ! switch_order_value "$b_new_post_file" "$a_post_num"; then
	echo "Error: Failed to switch order value for new b file to $a_post_num" >&2
	exit 1
fi
