import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { QuanLyDatVeService } from './quan-ly-dat-ve.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DanhSachVe, LichChieuDto } from './dto/danh-sach-dat-ve.dto';
import { Request } from 'express';
import { ResponseMessage } from 'src/common/decorators/response.message-decorator';

@ApiTags("QuanLyDatVe")
@Controller('api/QuanLyDatVe')
export class QuanLyDatVeController {
  constructor(private readonly quanLyDatVeService: QuanLyDatVeService) {}

  @Post('DatVe')
  @ResponseMessage('Đặt vé thành công!')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  bookTickets(@Body() danhSachVe: DanhSachVe, @Req() req: Request) {
    let { id }: any = req.user
    return this.quanLyDatVeService.bookTickets(Number(id), danhSachVe)
  }

  @Post('HuyVe')
  @ResponseMessage('Huỷ vé thành công!')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  cancelBooking(@Req() req: Request, @Query('MaGhe') maGhe: number) {
    let { id }: any = req.user
    return this.quanLyDatVeService.cancelBooking(Number(id), Number(maGhe))
  }

  @Get('LayDanhSachPhongVe')
  @ResponseMessage('Xử lý thành công!')
  getListTicketRoom(@Query('MaLichChieu') maLichChieu: number) {
    return this.quanLyDatVeService.getListTicketRoom(Number(maLichChieu))
  }

  @Post('TaoLichChieu')
  @ResponseMessage('Xử lý thành công!')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createShowtimes(@Body() taoLichChieu: LichChieuDto, @Req() req: Request) {
    let { type }: any = req.user
    return this.quanLyDatVeService.createShowtimes(taoLichChieu, type)
  }
}
