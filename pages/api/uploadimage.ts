import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files; filePath: string }> => {
  const options: formidable.Options = {};
  let filePath = '';
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images");
    options.filename = (name, ext, path, form) => {
      filePath = Date.now().toString() + "_" + path.originalFilename;
      return filePath;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files, filePath });
    });
  });
};

const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/images"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
  }
  const { filePath } = await readFile(req, true);
  res.json({ done: "ok", pathFile: "/images/"+filePath });
};

export default handler;
