import { Module } from '@nestjs/common';
import { QuanLyPhimService } from './quan-ly-phim.service';
import { QuanLyPhimController } from './quan-ly-phim.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [QuanLyPhimController],
  providers: [QuanLyPhimService],
})
export class QuanLyPhimModule {}
