import { Repository } from "typeorm";
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Injectable()
export class DbGenService<E> {
    constructor(readonly repo: Repository<E>) { }

    async findAll(filterDto, sorting, paginationParams): Promise<any> {
        try {
            const take = paginationParams.take || 10
            const skip = paginationParams.skip || 0

            const [result, total] = await this.repo.findAndCount(
                {
                    where: filterDto,
                    order: sorting,
                    take: take,
                    skip: skip
                }
            );

            return {
                data: result,
                count: total
            }
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async find(filterDto) {
        try {
            const result = await this.repo.find(filterDto);
            return result;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
    
    async findOne(filterDto) {
        try {
            const result = await this.repo.findOne(filterDto);
            return result;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async findOneWithoutNotFound(filterDto) {
        let result;
        
        try {
            result = await this.repo.findOne(filterDto);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        if(!result) {
            throw new NotFoundException('Data not found');
        }

        return result;
    }

    async create(postDto) {
        try {
            const result = await this.repo.save(postDto);
            return result;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException();
        }
    }

    async updateOne(param, postDto) {
        try {
            const result = await this.repo.update(param, postDto);
            return postDto;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException();
        }
    }

    async deleteOne(param) {
        await this.findOneWithoutNotFound(param);

        try {
            const result = await this.repo.delete(param);
            return null;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException();
        }
    }

    async delete(param) {
        try {
            const result = await this.repo.delete(param);
            return result;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}