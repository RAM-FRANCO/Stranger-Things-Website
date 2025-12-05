from PIL import Image
import sys
import os

def remove_black_background(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # If pixel is black (or very dark), make it transparent
            # Adjust threshold as needed
            if item[0] < 20 and item[1] < 20 and item[2] < 20:
                newData.append((0, 0, 0, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Processed {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    # Input paths
    input_files = [
        "/Users/ram/.gemini/antigravity/brain/dd9b1838-8613-4e1e-a9a0-2f35a6bb67e3/uploaded_image_0_1764911352101.png",
        "/Users/ram/.gemini/antigravity/brain/dd9b1838-8613-4e1e-a9a0-2f35a6bb67e3/uploaded_image_1_1764911352101.png"
    ]
    
    # Output directory
    output_dir = "/Users/ram/Projects/Personal/stranger-things-website/public/images"
    os.makedirs(output_dir, exist_ok=True)
    
    output_files = [
        os.path.join(output_dir, "stranger-ram-logo.png"),
        os.path.join(output_dir, "the-upside-down-logo.png")
    ]

    for inp, out in zip(input_files, output_files):
        remove_black_background(inp, out)
