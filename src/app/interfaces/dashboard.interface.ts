import {IOrderSummaryStatistic} from './order-summary-statistic.interface';
import {IRevenuePerDayStatistic} from './revenue-per-day-statistic.interface';

export interface IDashboardData {
    orderStatistics: IOrderSummaryStatistic[];
    revenueStatistics: any[];
}
