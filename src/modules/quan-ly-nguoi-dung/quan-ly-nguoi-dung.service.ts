import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, LoginDto, RegisterDto, UpdatePostUserDto, UpdatePutUserDto } from './dto/quan-ly-nguoi-dung.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuanLyNguoiDungService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService
  ) { }
  prisma = new PrismaClient()

  async login(loginDto: LoginDto) {
    try {
      let { taiKhoan, matKhau } = loginDto
      let key = new Date().getTime()
      let checkTaiKhoan = await this.prisma.nguoiDung.findFirst({ where: { tai_khoan: taiKhoan } })
      if (checkTaiKhoan) {
        if (bcrypt.compareSync(matKhau, checkTaiKhoan.mat_khau)) {
          let token = this.jwtService.signAsync({ id: checkTaiKhoan.ma_nguoi_dung, type: checkTaiKhoan.loai_nguoi_dung, keys: key }, { secret: this.config.get('SECRET_KEY') })
          return token
        } else {
          throw new BadRequestException('Mật khẩu không đúng!')
        }
      } else {
        throw new BadRequestException('Tài khoản không tồn tại !')
      }
    } catch (error) {
      throw error
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      let { email, hoTen, matKhau, taiKhoan, soDt } = registerDto
      let checkEmail = await this.prisma.nguoiDung.findFirst({ where: { email } })
      if (checkEmail) throw new BadRequestException('Email đã tồn tại!')
      let checkTaiKhoan = await this.prisma.nguoiDung.findFirst({ where: { tai_khoan: taiKhoan } })
      if (checkTaiKhoan) throw new BadRequestException('Tài khoản đã tồn tại!')
      let newUser = await this.prisma.nguoiDung.create({
        data: {
          ho_ten: hoTen,
          email,
          so_dt: soDt,
          tai_khoan: taiKhoan,
          mat_khau: bcrypt.hashSync(matKhau, 10)
        }
      })
      return newUser
    } catch (error) {
      throw error
    }
  }

  async getListTypeUser() {
    try {
      return await this.prisma.loaiNguoiDung.findMany()
    } catch (error) {
      throw error
    }
  }

  async getListUser() {
    try {
      return await this.prisma.nguoiDung.findMany({ include: { LoaiNguoiDung: true } });
    } catch (error) {
      throw error
    }
  }

  async getListPaginationUser(soTrang: number, soPhanTuTrenTrang: number) {
    try {
      let item = await this.prisma.nguoiDung.findMany({
        take: soPhanTuTrenTrang,
        skip: (soTrang - 1) * soPhanTuTrenTrang,
        include: { LoaiNguoiDung: true }
      })
      let totalCount = await this.prisma.nguoiDung.count()
      let totalPages = Math.ceil(totalCount / soPhanTuTrenTrang)
      return {
        currentPage: soTrang,
        count: soPhanTuTrenTrang,
        totalPages: totalPages,
        totalCount: totalCount,
        items: item
      }
    } catch (error) {
      throw error
    }
  }

  async findUser(tuKhoa: string) {
    try {
      let user = await this.prisma.nguoiDung.findMany({
        where: { ho_ten: { contains: `${tuKhoa}` } }
      })
      if (user.length < 1) throw new BadRequestException('Không tìm thấy người dùng!')
      return user
    } catch (error) {
      throw error
    }
  }

  async findPaginationUser(soTrang: number, soPhanTuTrenTrang: number, tuKhoa: string) {
    try {
      let item = await this.prisma.nguoiDung.findMany({
        where: { ho_ten: { contains: `${tuKhoa}` } },
        take: soPhanTuTrenTrang,
        skip: (soTrang - 1) * soPhanTuTrenTrang,
        include: { LoaiNguoiDung: true }
      })
      let totalCount = await this.prisma.nguoiDung.count({ where: { ho_ten: { contains: `${tuKhoa}` } } })
      let totalPages = Math.ceil(totalCount / soPhanTuTrenTrang)
      return {
        currentPage: soTrang,
        count: soPhanTuTrenTrang,
        totalPages: totalPages,
        totalCount: totalCount,
        items: item
      }
    } catch (error) {
      throw error
    }
  }

  async infoAccount(id: any) {
    let user = await this.prisma.nguoiDung.findUnique({ where: { ma_nguoi_dung: id }, include: { LoaiNguoiDung: true } })
    if (!user) throw new NotFoundException('Không tìm thấy người dùng!')
    return user
  }

  async infoUser(type: any, taiKhoan: string) {
    try {
      if (type == 1) throw new BadRequestException('Bạn không đủ quyền truy cập!')
      return this.prisma.nguoiDung.findMany({ where: { tai_khoan: { contains: `${taiKhoan}` } }, include: { LoaiNguoiDung: true } })
    } catch (error) {
      throw error
    }
  }

  async addUser(type: any, createUserDto: CreateUserDto) {
    try {
      if (type == 1) throw new BadRequestException('Bạn không đủ quyền truy cập!')
      let { email, hoTen, matKhau, taiKhoan, soDt, loaiNguoiDung } = createUserDto
      let checkEmail = await this.prisma.nguoiDung.findFirst({ where: { email } })
      if (checkEmail) throw new BadRequestException('Email đã tồn tại!')
      let checkTaiKhoan = await this.prisma.nguoiDung.findFirst({ where: { tai_khoan: taiKhoan } })
      if (checkTaiKhoan) throw new BadRequestException('Tài khoản đã tồn tại!')
      let newUser = await this.prisma.nguoiDung.create({
        data: {
          ho_ten: hoTen,
          email,
          so_dt: soDt,
          tai_khoan: taiKhoan,
          mat_khau: bcrypt.hashSync(matKhau, 10),
          loai_nguoi_dung: loaiNguoiDung
        }
      })
      return newUser
    } catch (error) {
      throw error
    }
  }

  async putInfoUser(updateUserDto: UpdatePutUserDto) {
    try {
      let { email, hoTen, matKhau, soDt, taiKhoan } = updateUserDto
      let user = await this.prisma.nguoiDung.findFirst({ where: { tai_khoan: taiKhoan } })
      if (!user) throw new BadRequestException('Không tìm thấy người dùng!')
      return await this.prisma.nguoiDung.update({
        where: { ma_nguoi_dung: user.ma_nguoi_dung },
        data: {
          ...user,
          email: email,
          ho_ten: hoTen,
          mat_khau: bcrypt.hashSync(matKhau, 10),
          so_dt: soDt
        }
      })
    } catch (error) {
      throw error
    }
  }

  async postInfoUser(updateUserDto: UpdatePostUserDto, type: number) {
    try {
      if (type == 1) throw new BadRequestException('Bạn không đủ quyền truy cập!')
      let { email, hoTen, matKhau, loaiNguoiDung, taiKhoan, soDt } = updateUserDto
      let user = await this.prisma.nguoiDung.findFirst({ where: { tai_khoan: taiKhoan } })
      if (!user) throw new BadRequestException('Không tìm thấy người dùng!')
      return await this.prisma.nguoiDung.update({
        where: { ma_nguoi_dung: user.ma_nguoi_dung },
        data: {
          ...user,
          email: email,
          ho_ten: hoTen,
          mat_khau: bcrypt.hashSync(matKhau, 10),
          so_dt: soDt,
          loai_nguoi_dung: loaiNguoiDung
        }
      })
    } catch (error) {
      throw error
    }
  }

  async delUser(type: any, taiKhoan: string) {
    try {
      if (type == 1) throw new BadRequestException('Bạn không đủ quyền truy cập!')
      let user = await this.prisma.nguoiDung.findFirst({ where: { tai_khoan: taiKhoan } })
      if (!user || user.isDelete) throw new BadRequestException('Tài khoản không tồn tại!')
      return await this.prisma.nguoiDung.update(
        {
          where: { ma_nguoi_dung: user.ma_nguoi_dung },
          data: { ...user, isDelete: true }
        }
      )
    } catch (error) {
      throw error
    }
  }
}
