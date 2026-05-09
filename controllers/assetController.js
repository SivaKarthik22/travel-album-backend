const cloudinary = require('cloudinary').v2;

const getAssetsInFolder = async (req, res) => {
    try {
        const folderName = req.params.folderName;
        if (!folderName) {
            return res.status(400).json({
                success: false,
                message: "folder name is required"
            });
        }

        const {
            limit = 100,
            cursor,
            urlOptions
        } = req.query;
        
        const cloudinaryOptions = {
            max_results: Number(limit),  // pagination size
        };
        if (cursor)
            cloudinaryOptions.next_cursor = cursor;

        const result = await cloudinary.api.resources_by_asset_folder(folderName, cloudinaryOptions);
        const assets = result.resources; 
        assets.forEach(resource => {
            resource.transformedImage = cloudinary.url(`${resource.public_id}.${resource.format}`, urlOptions);
        });

        res.status(200).json({
            success: true,
            message: "assets fetched successfully",
            responseData: {
                assets,
                nextCursor: result.next_cursor || null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error fetching assets: ${error.message}`
        });
    }
}

module.exports = {
    getAssetsInFolder
};


/* {
  "resources": [
    {
      "asset_id": "ebfe9f427f4a6787ea00e00da9e67f9e",
      "public_id": "face_center",
      "format": "jpg",
      "version": 1719305903,
      "resource_type": "image",
      "type": "upload",
      "created_at": "2024-06-25T08:58:23Z",
      "bytes": 379132,
      "width": 1870,
      "height": 1250,
      "asset_folder": "",
      "display_name": "face_center",
      "url": "http://res.cloudinary.com/cld-docs/image/upload/v1719305903/face_center.jpg",
      "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1719305903/face_center.jpg"
    },
    {
      "asset_id": "a13dc5a232a28c03bf5881ac39b94d2c",
      "public_id": "65646572251",
      "format": "jpg",
      "resource_type": "image",
      "type": "facebook",
      "created_at": "2024-06-25T09:01:30Z",
      "bytes": 0,
      "asset_folder": "",
      "display_name": "65646572251",
      "url": "http://res.cloudinary.com/cld-docs/image/facebook/65646572251.jpg",
      "secure_url": "https://res.cloudinary.com/cld-docs/image/facebook/65646572251.jpg"
    }
  ]
} */