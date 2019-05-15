const sortOptionsByAgreement = (options: any) => {
    const sortedOptions = [...options].sort((a, b) => {
        if (a.result.agreementInPercent > b.result.agreementInPercent) {
            return -1
        } else if (a.result.agreementInPercent < b.result.agreementInPercent) {
            return 1
        } else {
            return 0
        }
    })
    return sortedOptions
}

export default sortOptionsByAgreement;