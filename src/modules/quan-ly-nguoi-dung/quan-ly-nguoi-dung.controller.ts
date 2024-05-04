import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Req, Put } from '@nestjs/common';
import { QuanLyNguoiDungService } from './quan-ly-nguoi-dung.service';
import { CreateUserDto, LoginDto, RegisterDto, UpdatePostUserDto, UpdatePutUserDto } from './dto/quan-ly-nguoi-dung.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response.message-decorator';
import { CreatedResponse } from 'src/common/swagger/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@ApiTags("QuanLyNguoiDung")
@Controller('api/QuanLyNguoiDung')
export class QuanLyNguoiDungController {
  constructor(private readonly quanLyNguoiDungService: QuanLyNguoiDungService) { }

  @Get('LayDanhSachLoaiNguoiDung')
  @ResponseMessage('Xử lý thành công!')
  getListTypeUser() {
    return this.quanLyNguoiDungService.getListTypeUser();
  }
  @Post('DangNhap')
  @ResponseMessage('Đăng nhập thành công!')
  login(@Body() loginDto: LoginDto) {
    return this.quanLyNguoiDungService.login(loginDto);
  }

  @Post('DangKy')
  @ResponseMessage('Đăng ký thành công!')
  @CreatedResponse('Đăng ký thành công!', RegisterDto)
  register(@Body() registerDto: RegisterDto) {
    return this.quanLyNguoiDungService.register(registerDto);
  }

  @Get('LayDanhSachNguoiDung')
  @ResponseMessage('Xử lý thành công!')
  getListUser() {
    return this.quanLyNguoiDungService.getListUser();
  }

  @Get('LayDanhSachNguoiDungPhanTrang')
  @ResponseMessage('Xử lý thành công!')
  getListPaginationUser(@Query('soTrang') soTrang: string, @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: string) {
    return this.quanLyNguoiDungService.getListPaginationUser(Number(soTrang), Number(soPhanTuTrenTrang));
  }

  @Get('TimKienNguoiDung')
  @ResponseMessage('Xử lý thành công!')
  findUser(@Query('tuKhoa') tuKhoa: string) {
    return this.quanLyNguoiDungService.findUser(tuKhoa)
  }

  @Get('TimKhiemNguoiDungPhanTrang')
  @ResponseMessage('Xử lý thành công!')
  findPaginationUser(@Query('soTrang') soTrang: string, @Query('soPhanTuTrenTrang') soPhanTuTrenTrang: string, @Query('tuKhoa') tuKhoa: string) {
    return this.quanLyNguoiDungService.findPaginationUser(Number(soTrang), Number(soPhanTuTrenTrang), tuKhoa);
  }

  @Post('ThongTinTaiKhoan')
  @ResponseMessage('Xử lý thành công!')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  infoAccount(@Req() req: Request) {
    let { id }: any = req.user
    return this.quanLyNguoiDungService.infoAccount(id)
  }

  @Post('LayThongTinNguoiDung')
  @ResponseMessage('Xử lý thành công!')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  infoUser(@Query('Tài Khoản') taiKhoan: string, @Req() req: Request) {
    let { type }: any = req.user
    return this.quanLyNguoiDungService.infoUser(type, taiKhoan)
  }

  @Post('ThemNguoiDung')
  @ResponseMessage('Xử lý thành công!')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  addUser(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    let { type }: any = req.user
    return this.quanLyNguoiDungService.addUser(type, createUserDto)
  }

  @Put('CapNhatThongTinNguoiDung')
  @ResponseMessage('Xử lý thành công!')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  putInfoUser(@Body() updateUserDto: UpdatePutUserDto) {
    return this.quanLyNguoiDungService.putInfoUser(updateUserDto)
  }

  @Post('CapNhatThongTinNguoiDung')
  @ResponseMessage('Xử lý thành công!')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  postInfoUser(@Body() updateUserDto: UpdatePostUserDto, @Req() req: Request) {
    let { type }: any = req.user
    return this.quanLyNguoiDungService.postInfoUser(updateUserDto, type)
  }

  @Delete('XoaNguoiDung')
  @ResponseMessage('Xử lý thành công!')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Query('Tài Khoản') taiKhoan: string, @Req() req: Request) {
    let { type }: any = req.user
    return this.quanLyNguoiDungService.delUser(type, taiKhoan);
  }
}
