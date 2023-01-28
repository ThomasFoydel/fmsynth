class Log {
  constructor(opts) {
    this.minPos = opts.minPos || 0
    this.maxPos = opts.maxPos || 100

    this.minVal = Math.log(opts.minVal || 1)
    this.maxVal = Math.log(opts.maxVal || 9000)

    this.scale = (this.maxVal - this.minVal) / (this.maxPos - this.minPos)
  }

  value(position) {
    return Math.exp((position - this.minPos) * this.scale + this.minVal)
  }

  position(value) {
    return this.minPos + (Math.log(value) - this.minVal) / this.scale
  }
}

export const calcPos = (log, pos) => {
  if (pos === 0) return 0
  const val = log.value(pos)
  if (val > 1000) return Math.round(val / 100) * 100
  if (val > 500) return Math.round(val / 10) * 10
  return Math.round(val)
}

export default Log
