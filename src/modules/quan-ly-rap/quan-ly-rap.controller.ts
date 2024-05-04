import { Controller, Get, Query } from '@nestjs/common';
import { QuanLyRapService } from './quan-ly-rap.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response.message-decorator';

@ApiTags("QuanLyRap")
@Controller('api/QuanLyRap')
export class QuanLyRapController {
  constructor(private readonly quanLyRapService: QuanLyRapService) {}

  @Get('LayThongTinHeThongRap')
  @ResponseMessage('Xử lý thành công!')
  getInfoRap(@Query('MaHeThongRap') maHeThongRap: string) {
    return this.quanLyRapService.getInfoRap(Number(maHeThongRap))
  }

  @Get('LayThongTinCumRapTheoHeThong')
  @ResponseMessage('Xử lý thành công!')
  getInfoCumRap(@Query('MaHeThongRap') maHeThongRap: string) {
    return this.quanLyRapService.getInfoCumRap(Number(maHeThongRap))

  }

  @Get('LayThongTinLichChieuHeThongRap')
  @ResponseMessage('Xử lý thành công!')
  getInfoShowtimesTheaters(@Query('MaHeThongRap') maHeThongRap: string) {
    return this.quanLyRapService.getInfoShowtimesTheaters(Number(maHeThongRap))
  }

  @Get('LayThongTinLichChieuPhim')
  @ResponseMessage('Xử lý thành công!')
  getInfoShowtimesMovie(@Query('MaPhim') maPhim: number) {
    return this.quanLyRapService.getInfoShowtimesMovie(Number(maPhim))
  }
}
