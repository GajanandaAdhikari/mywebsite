#include<stdio.h>
#include<stdlib.h>

typedef struct {
    int *pages;
    int *frames;
    int page_sizes;
    int frame_sizes;
    int replace_page_frame_index;
    int hits;
    int faults;
}PageFrameTracker;

void PF_InitPageFrame(PageFrameTracker *pft_data){
    printf("Total no of pages : ");
    scanf("%d",&pft_data->page_sizes);
    printf("Size of frame : ");
    scanf("%d",&pft_data->frame_sizes);
    pft_data->replace_page_frame_index = 0;
    pft_data->hits = 0;
    pft_data->faults = 0;
    pft_data->pages = (int*)malloc(pft_data->page_sizes*sizeof(int));
    pft_data->frames = (int*)malloc(pft_data->frame_sizes*sizeof(int));

    if (pft_data->pages == NULL || pft_data->frames == NULL){
        printf("Memory allocation failed!!");
        exit(1);
    }
    
    for (int i = 0; i < pft_data->frame_sizes; i++)
    {
        pft_data->frames[i] = -1;
    }  
}

void PF_GetInputPage(PageFrameTracker *pft_data){
    printf("Pages : ");
    for (int i = 0; i < pft_data->page_sizes; i++)
    {
        scanf("%d",&pft_data->pages[i]);
    }   
}

void PF_UpdatedPageOutput(PageFrameTracker *pft_data,int found,int page){
    printf("Page %d \t\t",page);
    for (int j = 0; j < pft_data->frame_sizes; j++)
    {
        pft_data->frames[j]!=-1?printf("%d\t",pft_data->frames[j]):printf("_\t");   
    }
    found?printf("\t\tHit\n\n"):printf("\t\tFault\n\n");
    
    
}

void FIFO_ReplacePage(PageFrameTracker *pft_data)
{
    for (int i = 0; i < pft_data->page_sizes; i++)
    {
        int found = 0;
            for (int j = 0; j < pft_data->frame_sizes; j++)
            {
                if (pft_data->pages[i]==pft_data->frames[j])
                {
                    found = 1;
                    pft_data->hits++;
                    //printf("H");
                }
              
            }

            if (!found)
            {
                pft_data->frames[pft_data->replace_page_frame_index] = pft_data->pages[i];
                pft_data->replace_page_frame_index = (pft_data->replace_page_frame_index+1)%pft_data->frame_sizes;
                pft_data->faults++;
                //printf("F");
            }
            PF_UpdatedPageOutput(pft_data,found,pft_data->pages[i]);  
            
    }

    printf("Hits : %d , Faults : %d \n",pft_data->hits,pft_data->faults);
    
}

void PF_FreePageFrame(PageFrameTracker *pft_data)
{
    free(pft_data->pages);
    free(pft_data->frames);
    pft_data->page_sizes=0;
    pft_data->frame_sizes=0;
    pft_data->replace_page_frame_index=0;
    pft_data->hits=0;
    pft_data->faults=0;
}

int main()
{
    PageFrameTracker pft_data;
    PF_InitPageFrame(&pft_data);
    PF_GetInputPage(&pft_data);
    FIFO_ReplacePage(&pft_data);
    PF_FreePageFrame(&pft_data);
    return 0;
}


