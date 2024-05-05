import { Body, Controller, Delete, Get, Post, Query, Req, UploadedFile, UseGuards } from '@nestjs/common';
import { QuanLyPhimService } from './quan-ly-phim.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response.message-decorator';
import { Request } from 'express';
import { Upload } from 'src/common/decorators/upload.file-decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("QuanLyPhim")
@Controller('api/QuanLyPhim')
export class QuanLyPhimController {
  constructor(private readonly quanLyPhimService: QuanLyPhimService) { }

  @Get('LayDanhSachBanner')
  @ResponseMessage('Xử lý thành công!')
  getListBanner() {
    return this.quanLyPhimService.getListBanner()
  }

  @Get('LayDanhSachPhim')
  @ResponseMessage('Xử lý thành công!')
  getListMovie() {
    return this.quanLyPhimService.getListMovie()
  }

  @Get('LayDanhSachPhimPhanTrang')
  @ResponseMessage('Xử lý thành công!')
  getPaginationMovieList(@Query('tenPhim') tenPhim: string, @Query('soTrang') soTrang: string, @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: string) {
    return this.quanLyPhimService.getPaginationMovieList(tenPhim, Number(soTrang), Number(soPhanTuTrenTrang))
  }

  @Get('LayDanhSachPhimTheoNgay')
  @ResponseMessage('Xử lý thành công!')
  getListMovieByDay(@Query('tenPhim') tenPhim: string, @Query('soTrang') soTrang: string, @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: string, @Query('tuNgay') tuNgay: string, @Query('denNgay') denNgay: string) {
    return this.quanLyPhimService.getListMovieByDay(tenPhim, Number(soTrang), Number(soPhanTuTrenTrang), tuNgay, denNgay)
  }

  @Post('ThemPhimUploadHinh')
  @Upload()
  addMovie(@UploadedFile() file: any, @Req() req: Request) {
    let { type }: any = req.user
    let phim: any = req.body
    return this.quanLyPhimService.addMovie(file, type, phim)
  }

  @Post('CapNhatPhimUpload')
  @ResponseMessage('Xử lý thành công!')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateMovie() { }

  @Delete('XoaPhim')
  @ResponseMessage('Xử lý thành công!')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  delMovie(@Query('MaPhim') maPhim: string, @Req() req: Request) {
    let { type }: any = req.user
    return this.quanLyPhimService.delMovie(Number(maPhim), type)
  }

  @Get('LayThongTinPhim')
  @ResponseMessage('Xử lý thành công!')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getInfoMovie(@Query('MaPhim') maPhim: string, @Req() req: Request) {
    let { type }: any = req.user
    return this.quanLyPhimService.getInfoMovie(Number(maPhim), type)
  }
}
