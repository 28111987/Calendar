# Month Filter Fix

## Problem
The month filter dropdown shows labels like "March 2026" but the `report_month` column
stores values as "2026-03". The filter comparison fails because the formats don't match.

## Solution
The dropdown should use `value="2026-03"` internally while displaying `label="March 2026"`.

### In the Lovable frontend (React component)

Find the month filter dropdown and ensure it maps values correctly:

```tsx
// Month options — value is "YYYY-MM", label is human-readable
const monthOptions = [
  { value: "2026-01", label: "January 2026" },
  { value: "2026-02", label: "February 2026" },
  { value: "2026-03", label: "March 2026" },
  // Add more as needed
];

// In the filter/select component:
<Select value={selectedMonth} onValueChange={setSelectedMonth}>
  <SelectTrigger>
    <SelectValue placeholder="Select month" />
  </SelectTrigger>
  <SelectContent>
    {monthOptions.map((opt) => (
      <SelectItem key={opt.value} value={opt.value}>
        {opt.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

### In the Supabase query filter:
```tsx
// Filter should use the "YYYY-MM" value directly
const { data } = await supabase
  .from("sales_pipeline")
  .select("*")
  .eq("report_month", selectedMonth); // selectedMonth = "2026-03"
```

### Dynamic month generation (recommended):
```tsx
function generateMonthOptions(startYear: number = 2026): { value: string; label: string }[] {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const options = [];
  const now = new Date();
  const currentYear = now.getFullYear();

  for (let year = startYear; year <= currentYear; year++) {
    const maxMonth = year === currentYear ? now.getMonth() : 11;
    for (let m = 0; m <= maxMonth; m++) {
      const value = `${year}-${String(m + 1).padStart(2, "0")}`;
      options.push({ value, label: `${months[m]} ${year}` });
    }
  }
  return options;
}
```

## How to apply in Lovable
Paste this prompt into Lovable's AI chat:

> Fix the month filter dropdown. The dropdown label should show "January 2026", "February 2026", etc. but the VALUE sent to Supabase must be "2026-01", "2026-03" format matching the report_month column. Currently the filter doesn't work because the label text is being compared against the database value. Use a Select component where each option has value="YYYY-MM" and displays the full month name + year as the label.
