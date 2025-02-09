import { Injectable } from '@angular/core';
import {Voucher} from '../../models/voucher.model';
import {Points} from '../../models/Points';

@Injectable({ providedIn: 'root' })
export class PointsService {
  private readonly POINTS_KEY = 'recyclehub_points';
  private readonly VOUCHERS_KEY = 'recyclehub_vouchers';

  addPoints(userId: string, pointsToAdd: number): void {
    const points = this.getUserPoints(userId);
    points.totalPoints += pointsToAdd;
    points.lastUpdated = new Date();
    this.savePoints(points);
  }

  convertToVoucher(userId: string, pointsToConvert: number): Voucher | null {
    const points = this.getUserPoints(userId);

    if (points.totalPoints >= pointsToConvert) {
      const voucherAmount = this.getVoucherAmount(pointsToConvert);
      if (!voucherAmount) return null;

      points.totalPoints -= pointsToConvert;
      this.savePoints(points);

      const voucher: Voucher = {
        userId,
        amount: voucherAmount,
        pointsUsed: pointsToConvert,
        dateConverted: new Date()
      };

      this.saveVoucher(voucher);
      return voucher;
    }
    return null;
  }

  getUserPoints(userId: string): Points {
    const allPoints: Points[] = JSON.parse(localStorage.getItem(this.POINTS_KEY) || '[]');
    return allPoints.find(p => p.userId === userId) || { userId, totalPoints: 0, lastUpdated: new Date() };
  }

  getUserVouchers(userId: string): Voucher[] {
    const vouchers: Voucher[] = JSON.parse(localStorage.getItem(this.VOUCHERS_KEY) || '[]');
    return vouchers.filter(v => v.userId === userId);
  }

  private savePoints(points: Points): void {
    const allPoints: Points[] = JSON.parse(localStorage.getItem(this.POINTS_KEY) || '[]');
    const index = allPoints.findIndex(p => p.userId === points.userId);

    if (index !== -1) {
      allPoints[index] = points;
    } else {
      allPoints.push(points);
    }

    localStorage.setItem(this.POINTS_KEY, JSON.stringify(allPoints));
  }

  private saveVoucher(voucher: Voucher): void {
    const vouchers: Voucher[] = JSON.parse(localStorage.getItem(this.VOUCHERS_KEY) || '[]');
    vouchers.push(voucher);
    localStorage.setItem(this.VOUCHERS_KEY, JSON.stringify(vouchers));
  }

  private getVoucherAmount(points: number): number | null {
    switch (points) {
      case 100: return 50;
      case 200: return 120;
      case 500: return 350;
      default: return null;
    }
  }
}
