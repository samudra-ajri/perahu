export const calculateTotalSubjectsPoin = (subjects) => {
    if (subjects) {
        const poin = subjects.reduce((acc, item) => acc + item.completed.length, 0)
        return poin
    }
}

export const calculateRank = (poin) => {
    if (poin > 2209) {
        return {rank: 'Ancient', img: 'https://s.id/xtDuS'}
    } else if (poin > 2000) {
        return {rank: 'Legend', img: 'https://s.id/xtDal'}
    } else if (poin > 1500) {
        return {rank: 'Master', img: 'https://s.id/xtCNP'}
    } else if (poin > 1000) {
        return {rank: 'Elite', img: 'https://s.id/xtCvn'}
    } else if (poin > 500) {
        return {rank: 'Warrior', img: 'https://s.id/xtC3R'}
    } else {
        return {rank: 'Beginner', img: 'https://s.id/xtAJh'}
    }
}