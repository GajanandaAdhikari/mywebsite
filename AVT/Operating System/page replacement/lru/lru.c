#include <stdio.h>
#include <stdlib.h>
#include <limits.h>  // For INT_MAX

typedef struct
{
    int *pages;
    int *frames;
    int *last_used; // Array to keep track of when each frame was last used
    int page_sizes;
    int frame_sizes;
    int hits;
    int faults;
} PageFrameTracker;

void PF_InitPageFrame(PageFrameTracker *pft_data)
{
    printf("Total no of pages: ");
    scanf("%d", &pft_data->page_sizes);
    printf("Size of frame: ");
    scanf("%d", &pft_data->frame_sizes);

    pft_data->hits = 0;
    pft_data->faults = 0;

    pft_data->pages = (int *)malloc(pft_data->page_sizes * sizeof(int));
    pft_data->frames = (int *)malloc(pft_data->frame_sizes * sizeof(int));
    pft_data->last_used = (int *)malloc(pft_data->frame_sizes * sizeof(int)); // Track when frames were last used

    if (pft_data->pages == NULL || pft_data->frames == NULL || pft_data->last_used == NULL)
    {
        printf("Memory allocation failed!\n");
        exit(1);
    }

    for (int i = 0; i < pft_data->frame_sizes; i++)
    {
        pft_data->frames[i] = -1; // Initialize all frames to -1 (empty)
        pft_data->last_used[i] = -1; // Initialize usage tracking
    }
}

void PF_TestInputs(PageFrameTracker *pft_data)
{
    int page_values[] = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0};
    int max_pages = sizeof(page_values) / sizeof(page_values[0]);

    if (pft_data->page_sizes > max_pages)
    {
        printf("Page size is greater than available test data. Reducing to %d.\n", max_pages);
        pft_data->page_sizes = max_pages;
    }

    for (int i = 0; i < pft_data->page_sizes; i++)
    {
        pft_data->pages[i] = page_values[i];
    }
}

void PF_UpdatedPageOutput(PageFrameTracker *pft_data, int found, int page)
{
    printf("Page %d \t\t", page);
    for (int j = 0; j < pft_data->frame_sizes; j++)
    {
        if (pft_data->frames[j] != -1)
        {
            printf("%d\t", pft_data->frames[j]);
        }
        else
        {
            printf("_\t");
        }
    }
    found ? printf("\t\tHit\n\n") : printf("\t\tFault\n\n");
}

int LRU_ReplaceIndex(PageFrameTracker *pft_data)
{
    int min_last_used = INT_MAX;
    int replace_index = 0;

    // Find the frame that was least recently used
    for (int i = 0; i < pft_data->frame_sizes; i++)
    {
        if (pft_data->last_used[i] < min_last_used)
        {
            min_last_used = pft_data->last_used[i];
            replace_index = i;
        }
    }

    return replace_index;
}

void ReplacePage(PageFrameTracker *pft_data)
{
    for (int i = 0; i < pft_data->page_sizes; i++)
    {
        int found = 0;

        // Check if the page is already in any frame
        for (int j = 0; j < pft_data->frame_sizes; j++)
        {
            if (pft_data->pages[i] == pft_data->frames[j])
            {
                found = 1;
                pft_data->hits++;
                pft_data->last_used[j] = i; // Update the time the page was last used
                break;
            }
        }

        if (!found)
        {
            // Page fault: replace the least recently used page
            int replace_index = LRU_ReplaceIndex(pft_data);
            pft_data->frames[replace_index] = pft_data->pages[i];
            pft_data->last_used[replace_index] = i; // Update last used time
            pft_data->faults++;
        }

        PF_UpdatedPageOutput(pft_data, found, pft_data->pages[i]);
    }

    printf("Hits: %d, Faults: %d\n", pft_data->hits, pft_data->faults);
}

void PF_FreePageFrame(PageFrameTracker *pft_data)
{
    free(pft_data->pages);
    free(pft_data->frames);
    free(pft_data->last_used); // Free the last_used tracking array
}

int main()
{
    PageFrameTracker pft_data;

    PF_InitPageFrame(&pft_data);
    PF_TestInputs(&pft_data);
    ReplacePage(&pft_data);
    PF_FreePageFrame(&pft_data);

    return 0;
}
