import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon, CouponDocument } from 'src/coupon/entities/coupon.schema';
import { Course, CourseDocument } from 'src/course/entities/course.schema';
import { User, UserDocument } from 'src/user/entities/user.schema';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { Lot, LotDocument } from './entities/lot.schema';

@Injectable()
export class LotService {
  constructor(
    @InjectModel(Lot.name) private lotModel: Model<LotDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Coupon.name) private couponModel: Model<CouponDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}
  
  private couponLength: number = 12;

  private setCouponName(lotName: string, couponCode: number): string {
    const addedSpace = this.couponLength - lotName.length;
    let zeroString:string = '';
    for (let i = 0; i < addedSpace; i++){
      zeroString += "0";
    }
    const str:string = "" + couponCode.toString();
    const pad = zeroString;
    const ans = pad.substring(0, pad.length - str.length) + str
    return lotName+ans;
  }
  async create(createLotDto: any) {

    const user = await this.userModel.findOne({name:'user1'});
    let courses = createLotDto.courses;
    courses = courses.map(course => {
      return this.courseModel.findById(course);
    });
    const finalCourses = await Promise.all(courses);

    const lot = await this.lotModel.create({
      ...createLotDto,
      name:createLotDto.name.toUpperCase(),
      user:user,
      courses:finalCourses,
    });

    let couponArr = [];
    for(let i = 0; i < createLotDto.amount; i++) {
      couponArr.push(this.couponModel.create({
        name: this.setCouponName(lot.name,i),
        lot:lot,
      }))
    }

    const finalCouponArr = await Promise.all(couponArr);
    console.log(lot._id.toString());

    

    return await this.lotModel.findOneAndUpdate({_id:lot._id.toString()},{coupons:finalCouponArr},{new:true});
  }

  async findAll() {
    return await this.lotModel.find().populate('coupons');
  }

  findOne(id: number) {
    return `This action returns a #${id} lot`;
  }

  update(id: number, updateLotDto: UpdateLotDto) {
    return `This action updates a #${id} lot`;
  }

  remove(id: number) {
    return `This action removes a #${id} lot`;
  }
}
