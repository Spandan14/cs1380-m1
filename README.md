# M1: Serialization / Deserialization
> Full name: `Spandan Goel`
> Email:  `spandan_goel@brown.edu`
> Username:  `sgoel17`

## Summary
> Summarize your implementation, including key challenges you encountered

My implementation comprises `2` software components, totaling `288` lines of code. Key challenges included figuring out how to serialize native functions, which was solved with a native library function crawler which assigns IDs.

## Correctness & Performance Characterization
> Describe how you characterized the correctness and performance of your implementation

*Correcness*: I wrote `24` tests; these tests take `6.835` seconds to execute. This includes objects with a variety of features and sizes.

*Performance*: Evaluating serialization and deserialization on objects of varying sizes using [high-resolution timers](https://nodejs.org/api/perf_hooks.html) results in the following table:

|                 | Serialization | Deserialization |
| --------------- | ------------- | --------------- |
| `100` elems     | `0.1965` ms   | `0.2092` ms     |
| `1000` elems    | `0.2252` ms   | `0.5117` ms     |
| `10000` elems   | `2.2188` ms   | `8.4742` ms     |
| `100000` elems  | `1.5417` ms   | `5.0079` ms     |
| `100` funcs     | `0.0589` ms   | `0.0966` ms     |
| `1000` funcs    | `0.2193` ms   | `0.5120` ms     |
| `10000` funcs   | `2.0055` ms   | `5.3923` ms     |
| `100000` funcs  | `22.456` ms   | `56.788` ms     |
| `100` cycles    | `0.2080` ms   | `0.4346` ms     |
| `1000` cycles   | `1.5033` ms   | `3.9060` ms     |
| `100` native    | `0.1522` ms   | `0.2035` ms     |
| `1000` native   | `0.9222` ms   | `1.8096` ms     |
| `10000` native  | `7.4652` ms   | `25.008` ms     |
| `100000` native | `105.12` ms   | `286.45` ms     |

## Time to Complete
> Roughly, how many hours did this milestone take you to complete?

Hours: `7`

## Wild Guess
> This assignment made a few simplifying assumptions — for example, it does not attempt to support the entire language. How many lines of code do you think it would take to support other features? (If at all possible, try to justify your answer — even a rough justification about the order of magnitude and its correlation to missing features is enough.)

FLoC: `2500`

