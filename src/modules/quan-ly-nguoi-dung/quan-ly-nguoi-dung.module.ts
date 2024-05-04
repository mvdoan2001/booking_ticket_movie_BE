import { Module } from '@nestjs/common';
import { QuanLyNguoiDungService } from './quan-ly-nguoi-dung.service';
import { QuanLyNguoiDungController } from './quan-ly-nguoi-dung.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [QuanLyNguoiDungController],
  providers: [QuanLyNguoiDungService],
})
export class QuanLyNguoiDungModule {}
