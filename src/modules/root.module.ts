import { Module } from "@nestjs/common";
import { QuanLyDatVeModule } from './quan-ly-dat-ve/quan-ly-dat-ve.module';
import { QuanLyNguoiDungModule } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.module';
import { QuanLyPhimModule } from './quan-ly-phim/quan-ly-phim.module';
import { QuanLyRapModule } from './quan-ly-rap/quan-ly-rap.module';


@Module({
    imports: [QuanLyDatVeModule, QuanLyNguoiDungModule, QuanLyPhimModule, QuanLyRapModule]
})

export class RootModule {}