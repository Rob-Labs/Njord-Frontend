const BahasaIndonesia = {
  translation: {
    common: {
      //Only change the text on the right in quote marks!
      language: 'Bahasa',
      bond: 'Bond',
      stake: 'Stake',
      migrate: 'Migrasikan',
      roi: 'ROI', //Return on Investment
      max: 'Maks',
      apy: 'APY', //Annualised Percentage Yield
      tvl: 'TVL', //Total Value Locked
      amount: 'Jumlah',
      approve: 'Setujui',
      claim: 'Klaim',
      clamPrice: 'Harga NJORD',
      connectWallet: 'Sambungkan Wallet',
      price: 'Harga',
      buy: 'Beli',
      addLiquidity: 'Tambahkan Likuiditas',
      redeem: 'Tukarkan',
      treasuryBalance: 'Saldo Kas',
      currentIndex: 'Indeks Terkini',
      yourBalance: 'Saldo Anda',
      currentApy: 'APY Terkini',
      dashboard: 'Dashboard',
      calculator: 'Kalkulator',
    },
    time: {
      days: 'Hari',
      hours: 'Jam',
      minutes: 'Menit',
      seconds: 'Detik',
    },
    // src\views\Dashboard
    dashboard: {
      marketCap: 'Kapitalisasi Pasar',
      stakingRatio: 'Rasio Staking',
      circulatingSupply: 'Sirkulasi Suplai',
      backingPerClam: 'Perlindungan per NJORD',
      otterKingdom: 'Selamat Datang di Kerajaan Otter',
      decentralized: 'Memecoin dengan Cadangan Terdesentralisasi',
      clamStaked: 'NJORD Terkunci',
      apyOverTime: 'APY seiring waktu',
      runway: 'Runway tersedia',
      totalValueDeposited: 'Total Nilai Setoran',
      marketValue: 'Nilai Pasar Aset Kas',
      riskFree: 'Nilai Bebas Resiko Aset Kas',
      pol: 'Likuiditas Milik Protokol',
      tooltipItems: {
        tvl: 'Total Nilai Setoran',
        current: 'Saat Ini',
        lpTreasury: 'Kas LP',
        marketLP: 'LP Pasar',
      },
      tooltipInfoMessages: {
        tvl: 'Total Value Deposited atau Total Nilai Setoran, adalah nominal dollar dari seluruh NJORD yang terkunci dalam protokol. Metrik ini biasanya digunakan sebagai indikator perkembangan atau kesehatan dari proyek DeFi.',
        mvt: 'Market Value of Treasury Assets atau Nilai Pasar Aset Kas, adalah jumlah dari nilai (dalam dollar) seluruh aset yang dipegang oleh kas.',
        rfv: 'Risk Free Value atau Nilai Bebas Resiko, adalah nominal dana yang terjamin akan dipergunakan oleh kas untuk perlindungan NJORD.',
        pol: 'Protocol Owned Liquidity atau Likuiditas Milik Protokol, adalah jumlah LP yang dimiliki dan dikontrol oleh kas. Semakin banyak POL maka semakin baik bagi protokol dan penggunanya.',
        holder: 'Holder, mewakili angka total dari otter (pemegang sNJORD)',
        staked: 'NJORD Terkunci, adalah rasio sNJORD terhadap NJORD (staking vs non-staking)',
        apy: 'Annual Percentage Yield atau Persentase Imbal Hasil Tahunan, adalah perwakilan yang dinormalisasi dari suatu suku bunga, berdasarkan compounding dengan periode melebihi satu tahun. Mohon dicatat bahwa APY yang disediakan adalah indikator kecenderungan rata-rata dan bukan hasil mendatang yang pasti.',
        runway: 'Runway, adalah sisa hari dimana pengeluaran sNJORD dapat dipertahankan pada tingkat tertentu. APY lebih rendah = runway lebih panjang',
        currentIndex:
          'Indeks terkini melacak jumlah sNJORD yang terakumulasi sejak awal dimulainya stacking. Sederhananya, berapa banyak sNJORD yang seseorang akan miliki jika mereka melakukan stacking dan memegang satu NJORD sejak hari pertama.',
      },
    },
    // src\views\Migrate
    migrate: {
      migration: 'Migrasi',
      oldClamSupply: 'Suplai NJORD Lama',
      oldTreasuryReserve: 'Cadangan Kas Lama',
      migrationProgress: 'Perkembangan Migrasi',
      connectWalletDescription: 'Sambungkan wallet anda untuk melakukan migrasi token NJORD!',
      steps: 'Langkah',
      yourAmount: 'Jumlah Anda',
      claimWarmup: 'Warmup Klaim',
      done: 'SELESAI',
      unstakeClam: 'Lepas NJORD',
      migrateTo: 'Migrasikan NJORD ke NJORD',
      estimatedClamTwo: 'Estimasi NJORD ',
      yourClamTwoBalance: 'Saldo NJORD Anda',
    },
    // src\views\Bond
    bonds: {
      debtRatio: 'Rasio Utang',
      vestingTerm: 'Jangka Vesting',
      recipient: 'Penerima',
      purchased: 'Dibeli',
      bondPrice: 'Harga Bond',
      deprecated: 'Depresiasi',
      bondDiscount: 'diskon!',
      myBond: 'Bond Saya',
      advancedSettings: {
        txrevert: 'Transaksi dapat batal jike harga berubah lebih dari % slippage',
        recipientAddress: 'Pilih alamat penerima. Secara bawaan, ini adalah alamat anda yang saat ini sedang tersambung',
      },
      purchase: {
        noValue: 'Mohon masukkan nilai!',
        invalidValue: 'Mohon masukkan nilai yang benar!',
        resetVestingAutostake: 'Anda sudah memiliki bond. Melakukan bonding akan memutar kembali periode vesting anda. Apakah anda masih ingin melanjutkan?',
        resetVesting:
          'Anda sudah memiliki bond. Melakukan bonding akan memutar kembali periode vesting anda serta mengorbankan imbalan. Kami menyarankan untuk mengambil imbalan terlebih dahulu atau menggunakan wallet baru. Apakah anda masih ingin melanjutkan?',

        fourFourInfo:
          'Catatan: Bond (4, 4) akan memulai stacking dengan semua NJORD di awal, jadi anda akan mendapatkan semua imbalan rebase selama jangka vesting berlangsung. Ketika vesting sudah terpenuhi, anda hanya akan bisa mengeklaim sNJORD.',
        approvalInfo:
          'Note: Opsi transaksi "Setujui" hanya dibutuhkan saat pertama kali melakukan bonding; bonding selanjutnya hanya memerlukan anda untuk bertransaksi dengan opsi "Bond".',
        roiFourFourInfo: '* ROI dari bond (4,4) sudah termasuk imbalan staking 5-hari',

        youWillGet: 'Anda Mendapat',
        maxBuy: 'Maksimal Beli',
      },
      redeem: {
        fullyVestedPopup: 'Anda hanya bisa mengeklaim bond (4,4) setelah vesting terpenuhi.',
        claimAndAutostake: 'Klaim dan Autostake',
        pendingRewards: 'Imbalan Tertunda',
        claimableRewards: 'Imbalan Tersedia',
        timeUntilFullyVested: 'Waktu hingga vesting terpenuhi',
      },
    },
    // src\views\Landing
    landing: {
      description: {
        part1: 'Memecoin dengan',
        part2: 'Cadangan Terdesentralisasi',
        tagline: 'Meme penyimpanan nilai pertama',
      },
      appButton: 'Masuk APP',
      footer: {
        joinOurCommunity: 'Bergabung di Komunitas Kami',
        letsMakeIt: 'Mari wujudkan',
        contactUs: 'Kontak Kami',
      },
      splashPage: {
        howModoFinanceWorks: 'Bagaimana Cara Kerja ModoFinance',
        treasuryRevenue: 'Pemasukan Kas',
        bondsLPFees: 'Tarif Bond & LP',
        bondSales: 'Penjualan Bond dan Tarif LP meningkatkan Pemasukan Kas Otter, mengunci likuiditas, dan membantu mengontrol suplai NJORD',
        treasuryGrowth: 'Pertumbuhan Kas',
        otterTreasury: 'Kas Otter',
        treasuryInflow: 'Arus masuk kas digunakan untuk menambah Saldo Kas Otter dan melindungi token NJORD serta mengatur APY staking',
        stakingRewards: 'Imbalan Staking',
        clamToken: 'Token NJORD',
        compounds: 'Compounding memberikan hasil secara otomatis melalui memecoin yang memiliki perlindungan kas dengan nilai intrinsik',
        treasuryBalance: 'Saldo Kas',
      },
    },
    // src\views\Stake
    stake: {
      clamStaking: 'Staking NJORD',
      connectWalletDescription: 'Sambungkan wallet anda untuk melakukan staking token NJORD!',
      approvalInfo:
        'Note: Opsi transaksi "Setujui" hanya dibutuhkan saat pertama kali melakukan staking(kunci)/unstaking(lepas); staking/unstaking selanjutnya hanya memerlukan anda untuk bertransaksi dengan opsi "Stake" atau "Unstake".',
      balanceInWarmup: 'Saldo Staking Anda dalam Warmup',
      stakedBalance: 'Saldo Staking Anda',
      nextRewardAmount: 'Jumlah Imbalan Selanjutnya',
      nextRewardYield: 'Bunga Imbalan Selanjutnya',
      roiFiveDay: 'ROI (Hitungan 5-hari)', //Return on Investment
    },
    // src\views\Calculator
    calculator: {
      current: 'Saat Ini',
      estimateReturns: 'Perkirakan pendapatan anda',
      yoursClamBalance: 'Saldo sNJORD Anda',
      sClamAmount: 'Jumlah sNJORD',
      purchasePrice: 'Harga NJORD Price saat Pembelian ($)',
      futurePrice: 'Harga Pasar NJORD Masa Mendatang ($)',
      results: 'Hasil',
      initialInvestment: 'Investasi awal anda',
      currentWealth: 'Kekayaan saat ini',
      rewardEstimation: 'Estimasi imbalan NJORD',
      potentialReturn: 'Potensi pendapatan',
      potentialPercentageGain: 'Potensi persentase keuntungan',
    },
    // src\components
    components: {
      staked: 'Staking',
      notStaked: 'Non-staking',
      disconnect: 'Putuskan',
      buy: 'BELI',
      buyOnQuickswap: 'Beli di Quickswap',
      addTokenToWallet: 'TAMBAHKAN TOKEN KE WALLET',
      toNextHarvest: 'Menuju Panen Selanjutnya',
      harvesting: 'Memanen',
      name: 'Nama',
    },
    // src\components\NFT
    nft: {
      which: 'Mana ',
      willYouGet: ' yang akan anda dapat?',
      safehandDescription:
        'Diberikan kepada setiap Otter yang sudah menjalani staking selama setidaknya 2 minggu dengan jumlah lebih dari 4 sNJORD pada saat tanggal pemberitahuan.',
      furryhandDescription:
        'Diberikan kepada setiap Otter yang sudah menjalani staking selama setidaknya 2 minggu dengan jumlah lebih dari 40 sNJORD pada saat tanggal pemberitahuan.',
      stonehandDescription: 'Diberikan kepada pemegang Wallet yang memiliki lebih dari 56 sNJORD dan sudah menjalani staking dari 9 November 2021 hingga tanggal pemberitahuan.',
      diamondhandDescription:
        'Diberikan karena telah menjalani staking dengan seluruh jumlah NJORD yang dimiliki sejak IDO maupun tanggal rilis (3 November 2021, dengan jumlah minimal 20 sNJORD) sampai pada tanggal pemberitahuan.',
    },
  },
};
export default BahasaIndonesia;
