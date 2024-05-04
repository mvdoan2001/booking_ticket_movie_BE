import { ApiProperty } from "@nestjs/swagger"

export class LoginDto {
    @ApiProperty()
    taiKhoan: string
    @ApiProperty()
    matKhau: string
}

export class RegisterDto {
    @ApiProperty()
    hoTen: string
    @ApiProperty()
    email: string
    @ApiProperty()
    soDt: string
    @ApiProperty()
    taiKhoan: string
    @ApiProperty()
    matKhau: string
}

export class CreateUserDto {
    @ApiProperty()
    hoTen: string
    @ApiProperty()
    email: string
    @ApiProperty()
    soDt: string
    @ApiProperty()
    taiKhoan: string
    @ApiProperty()
    matKhau: string
    @ApiProperty()
    loaiNguoiDung: number
}

export class UpdatePostUserDto {
    @ApiProperty()
    hoTen: string
    @ApiProperty()
    email: string
    @ApiProperty()
    soDt: string
    @ApiProperty()
    taiKhoan: string
    @ApiProperty()
    matKhau: string
    @ApiProperty()
    loaiNguoiDung: number
}

export class UpdatePutUserDto {
    @ApiProperty()
    hoTen: string
    @ApiProperty()
    email: string
    @ApiProperty()
    soDt: string
    @ApiProperty()
    taiKhoan: string
    @ApiProperty()
    matKhau: string
}