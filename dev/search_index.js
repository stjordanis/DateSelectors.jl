var documenterSearchIndex = {"docs":
[{"location":"api.html#API","page":"API","title":"API","text":"","category":"section"},{"location":"api.html","page":"API","title":"API","text":"partition","category":"page"},{"location":"api.html#Base.Iterators.partition","page":"API","title":"Base.Iterators.partition","text":"partition(dates::AbstractInterval{Date}, s::DateSelector)\npartition(dates::StepRange{Date, Day}, selector::DateSelector)\n\nPartition the set of dates into disjoint validation and holdout sets according to the selector and return a NamedTuple({:validation, :holdout}) of iterators.\n\n\n\n\n\n","category":"function"},{"location":"api.html#Selectors","page":"API","title":"Selectors","text":"","category":"section"},{"location":"api.html","page":"API","title":"API","text":"DateSelector\nNoneSelector\nPeriodicSelector\nRandomSelector","category":"page"},{"location":"api.html#DateSelectors.DateSelector","page":"API","title":"DateSelectors.DateSelector","text":"DateSelector\n\nDetermines how to partition a date set into disjoint validation and holdout sets.\n\n\n\n\n\n","category":"type"},{"location":"api.html#DateSelectors.NoneSelector","page":"API","title":"DateSelectors.NoneSelector","text":"NoneSelector()\n\nAssign all dates to the validation set, select no holdout dates.\n\n\n\n\n\n","category":"type"},{"location":"api.html#DateSelectors.PeriodicSelector","page":"API","title":"DateSelectors.PeriodicSelector","text":"PeriodicSelector(period::DatePeriod, stride::DatePeriod=Day(1), offset::DatePeriod=Day(0))\n\nAssign holdout dates by taking a set of size stride once per period. The offset is relative to Monday 1st Jan 1900, and controls when the selected section starts.\n\nFor example, PeriodicSelector(Week(1), Day(2), Day(1)) will select 2 days per week. With this selected periods offset by 1 day from 1st Jan 1900. I.e. if applied to the first two weeks of the year 1900, it would select 2nd, 3rd, 9th and 8th of Jan 1900.\n\nNote: this cannot be actually used to select days earlier than offset after 1st Jan 1900.\n\n\n\n\n\n","category":"type"},{"location":"api.html#DateSelectors.RandomSelector","page":"API","title":"DateSelectors.RandomSelector","text":"RandomSelector(seed, holdout_fraction=1//2, block_size=Day(1), offset=Day(0))\n\nDetermine holdout set by randomly subsampling contiguous blocks of size block_size without replacement using a MersenneTwister seeded with seed. The probability of any given block being in the holdout set is given by holdout_fraction.\n\nThe offset is rarely needed, but is used to control block boundries. It is given as a offset relative to Monday 1st Jan 1900. For example, with the default offset of Day(0), and if using a Week(1) block_size, then every block will start on a Monday, and will go for 1 or more weeks from there.\n\nNote that at the boundries of the partitioned dates the blocks may not be of size block_size if they go over the edge – this is infact the common case.\n\n\n\n\n\n","category":"type"},{"location":"api.html#Index","page":"API","title":"Index","text":"","category":"section"},{"location":"api.html","page":"API","title":"API","text":"Modules = [DateSelectors]","category":"page"},{"location":"examples.html#Examples","page":"Examples","title":"Examples","text":"","category":"section"},{"location":"examples.html#NoneSelector","page":"Examples","title":"NoneSelector","text":"","category":"section"},{"location":"examples.html","page":"Examples","title":"Examples","text":"The NoneSelector simply assigns all days to the validation set and none to the holdout set.","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"using DateSelectors\nusing Dates\n\ndate_range = Date(2019, 1, 1):Day(1):Date(2019, 3, 31)\n\nselector = NoneSelector()\n\nvalidation, holdout = partition(date_range, selector)\n\nvalidation","category":"page"},{"location":"examples.html#RandomSelector","page":"Examples","title":"RandomSelector","text":"","category":"section"},{"location":"examples.html","page":"Examples","title":"Examples","text":"The RandomSelector uniformly subsamples the collection of dates and assigns them to the holdout set.","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"Here we use a seed of 42 to uniformly sample from the date range with probability 10% into the holdout set, in 3-day blocks, some of which may be contiguous. Note that for a given seed and date range the portion in the holdout set may not be exactly 10% as it is a random sample.","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"The selection, while random, is fully determined by the RandomSelector object and is invariant on the date range. That is to say if one has two distinct but overlapping date ranges, and uses the same RandomSelector object, then the overlapping days will consistently be placed into either holdout or validation in both.","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"selector = RandomSelector(42, 0.10, Day(3))\n\nvalidation, holdout = partition(date_range, selector)\n\nvalidation","category":"page"},{"location":"examples.html#PeriodicSelector","page":"Examples","title":"PeriodicSelector","text":"","category":"section"},{"location":"examples.html","page":"Examples","title":"Examples","text":"The PeriodicSelector assigns holdout dates by taking a stride once per period. Where in the period the holdout stride is taken from is determined by the offset. The offset is relative to Monday 1st Jan 1900.","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"As the stride start location is relative to a fixed point rather than to the date range, this means that the selection, is fully determined by the PeriodicSelector object and is invariant on the date range. That is to say if one has two distinct but overlapping date ranges, and uses the same PeriodicSelector object, then the overlapping days will consistently be placed into either holdout or validation in both.","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"In this example - for whatever reason - we want to assign weekdays as validation days and weekends as holdout days. Therefore, our period is Week(1) and stride is Day(2), because out of every week we want to keep 2 days in the holdout. Now, since we need to start selecting on the Saturday, we must first offset by Day(5) because zero offset corresponds to a Monday.","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"selector = PeriodicSelector(Week(1), Day(2), Day(5))\n\nvalidation, holdout = partition(date_range, selector)\n\nvalidation","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"We can verify that it returned what we expected:","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"unique(dayname.(validation))","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"unique(dayname.(holdout))","category":"page"},{"location":"examples.html#Using-AbstractIntervals","page":"Examples","title":"Using AbstractIntervals","text":"","category":"section"},{"location":"examples.html","page":"Examples","title":"Examples","text":"You can also specify the date range as an Interval:","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"using Intervals\n\nselector = PeriodicSelector(Week(1), Day(2), Day(4))\n\ndate_range = Date(2018, 1, 1)..Date(2019, 3, 31)\n\nvalidation, holdout = partition(date_range, selector)\n\nvalidation","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"as well as an AbstractInterval:","category":"page"},{"location":"examples.html","page":"Examples","title":"Examples","text":"\nselector = PeriodicSelector(Week(1), Day(2), Day(4))\n\ndate_range = AnchoredInterval{Day(90), Date}(Date(2019, 1, 1))\n\nvalidation, holdout = partition(date_range, selector)\n\nvalidation","category":"page"},{"location":"index.html#DateSelectors.jl","page":"Home","title":"DateSelectors.jl","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"DateSelectors.jl simplifies the partitioning of a collection of dates into non-contiguous validation and holdout sets in line with our best practice approach for tuning hyper-parameters in EIS.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"The package exports the partition function, which assigns dates to the validation and holdout sets according to the DateSelector. The available DateSelectors are:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"NoneSelector: assigns all dates to the validation set.\nRandomSelector: randomly draws a subset of dates without replacement.\nPeriodicSelector: draws contiguous subsets of days periodically from the collection.","category":"page"}]
}
