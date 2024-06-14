import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { path as root_path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as path from 'path';
import { FileResponse } from './dto/file.response';

@Injectable()
export class FilesService {
  async saveFiles(
    files: Express.Multer.File[],
    folder: string = 'default',
  ): Promise<FileResponse[]> {
    const uploadFolder = `${root_path}/uploads/${folder}`;
    await ensureDir(uploadFolder);
    const res: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        const filename = `${createId()}${path.extname(file.originalname)}`;
        await writeFile(`${uploadFolder}/${filename}`, file.buffer);
        return {
          url: `/uploads/${folder}/${filename}`,
        };
      }),
    );

    return res;
  }
}
