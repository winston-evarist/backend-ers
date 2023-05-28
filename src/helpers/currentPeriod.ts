export default function currentPeriod(period: 'year' | 'month'): any {
    if (period === 'year')
        return new Date().getFullYear()
    else {
        let months: string[] = [
            'january', 'february', 'march', 'april', 'may', 'june', 'july', 'augost', 'september', 'october', 'november', 'december'
        ]
        return months[new Date().getMonth()].toLowerCase()
    }
}